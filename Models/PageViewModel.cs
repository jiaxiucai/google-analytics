using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ATD.WebAnalytics.Models
{
    public class PageViewModel
    {
        public Guid id { set; get;}

        /// <summary>
        /// 来源地址 ReferrerUrl
        /// </summary>
        public string urr { set; get; }

        /// <summary>
        /// 当前请求地址
        /// </summary>
        public string cur { set; get; }
        /// <summary>
        /// 网页标题
        /// </summary>
        public string title { set; get; }
        /// <summary>
        /// 用户唯一ID
        /// </summary>
        public int GUID { set; get; }
        /// <summary>
        /// IP地址
        /// </summary>
        public string ip { set; get; }
        /// <summary>
        /// 国家
        /// </summary>
        public string country { set; get; }
        /// <summary>
        /// 省
        /// </summary>
        public string province { set; get; }
        /// <summary>
        /// 城市
        /// </summary>
        public string city { set; get; }

        /// <summary>
        /// 来源参数名称
        /// </summary>
        public string urp { set; get; }

        /// <summary>
        /// 来源参数值
        /// </summary>
        public string urpv { set; get; }

        /// <summary>
        /// 停留时间
        /// </summary>
        public int st { set; get; }
    }
}