using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using System.Web.Http.Cors;
using ATD.WebAnalytics.DAContext;
using ATD.WebAnalytics.Models;
using CubicFWNet.Data.Models;

namespace CubicFWNet.Mvc.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "get", SupportsCredentials = true)]
    [RoutePrefix("api/analytics")]
    public class AnalyticsController : ApiController
    {
        private AnalysisColectApp _app;

        public AnalyticsController()
        {
            _app = new AnalysisColectApp();
        }


        /// <summary>
        /// 手机
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [ActionName("firstvisit")]
        public async Task firstVisit([FromUri]FirstVisitModel model)
        {
            AnalysisColect colect = new AnalysisColect()
            {
                BColor = model.bColor,
                BFlash = model.bFlash,
                BHl = model.bHl,
                BJava = model.bJava,
                BOS = model.bOS,
                BScr = model.bScr,
                BType = model.bType,
                BVersion = model.bVersion,
                City = model.city,
                Country = model.country,
                GUID = model.GUID,
                IP = model.ip,
                IsFirst = true,
                KeyWord = model.keyWord,
                ProjectId = model.id,
                Province = model.province,
                ReferrerUrl = model.urr,
                URP = model.urp,
                URPV = model.urpv,
                Stay = model.st
            };
            _app.Insert(colect);
        }

        [HttpGet]
        [ActionName("pageview")]
        public void pageView([FromUri]PageViewModel model)
        {
            AnalysisColect colect = new AnalysisColect()
            {
                City = model.city,
                Country = model.country,
                GUID = model.GUID,
                IP = model.ip,
                IsFirst = false,
                ProjectId = model.id,
                Province = model.province,
                ReferrerUrl = model.urr,
                URP = model.urp,
                RequestUrl = model.cur,
                Title = model.title,
                Stay = model.st
            };
            _app.Insert(colect);
        }

    }
}
