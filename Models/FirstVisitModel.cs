using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ATD.WebAnalytics.Models
{
    public class FirstVisitModel
    {
        public Guid id { set; get; }

        /// <summary>
        /// 来源地址 ReferrerUrl
        /// </summary>
        public string urr { set; get; }
        /// <summary>
        /// 搜索关键字
        /// </summary>
        public string keyWord { set; get; }
        /// <summary>
        /// 浏览器类型 
        /// </summary>
        public string bType { set; get; }
        /// <summary>
        /// 浏览器版本
        /// </summary>
        public string bVersion { set; get; }
        /// <summary>
        /// 该值指示浏览器是否支持并启用了 Java 1：支持  -1：不支持
        /// </summary>
        public short bJava { set; get; }
        /// <summary>
        /// Flash版本
        /// </summary>
        public string bFlash { set; get; }
        /// <summary>
        /// 操作系统版本
        /// </summary>
        public string bOS { set; get; }
        /// <summary>
        /// 屏幕分辨率
        /// </summary>
        public string bScr { set; get; }
        /// <summary>
        /// 屏幕 调色板的比特深度
        /// </summary>
        public string bColor { set; get; }
        /// <summary>
        /// 操作系统语言
        /// </summary>
        public string bHl { set; get; }
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