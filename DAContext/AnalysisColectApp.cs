using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using CubicFWNet.Common;
using CubicFWNet.Data.InternetADManager;
using CubicFWNet.Data.Models;

namespace ATD.WebAnalytics.DAContext
{
    public class AnalysisColectApp
    {
        private readonly AnalysisColectRepository _server = new AnalysisColectRepository();
        private readonly AnalysisTotalRepository _analysisTotalRepository = new AnalysisTotalRepository();

        public async Task Insert(AnalysisColect model)
        {
            Task.Run(() =>
            {
                var date = DateTime.Now;
                //查询出当天的统计数据
                var total = _analysisTotalRepository.FindEntity(a => a.ProjectId == model.ProjectId && a.Day.Year == date.Year && a.Day.Month == date.Month && a.Day.Day == date.Day);
                if (total != null)
                {
                    //PV添加1
                    total.PV += 1;
                    //UV 判断GUID相同 当天有没有记录 
                    var guid = _server.FindEntity(a => a.ProjectId == model.ProjectId && a.Day.Year == date.Year && a.Day.Month == date.Month && a.Day.Day == date.Day && a.GUID == model.GUID);
                    if (guid == null)
                    {
                        total.UV += 1;
                    }
                    //IP 判断IP相同 当天有没有记录 
                    var ip = _server.FindEntity(a => a.ProjectId == model.ProjectId && a.Day.Year == date.Year && a.Day.Month == date.Month && a.Day.Day == date.Day && a.IP == model.IP);
                    if (ip == null)
                    {
                        total.IP += 1;
                    }
                    if (total.PV != 0 && total.UV != 0)
                    {
                        total.CTR = ((double)total.UV * 100 / (double)total.PV).ToDecimal(2);
                    }
                    _analysisTotalRepository.Update(total);
                }
                else
                {
                    //若是没有则插入
                    _analysisTotalRepository.Insert(new AnalysisTotal()
                    {
                        ProjectId = model.ProjectId,
                        IP = 1,
                        UV = 1,
                        PV = 1
                    });
                }
                //添加纪录
                _server.Insert(model);
            });
        }


    }
}