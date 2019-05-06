/********************************************************************
 * Function: 三网合一
 * 2019-04-25 佟春晖 创建
 ********************************************************************/

function SaleAccessHouse() {

    var access = new BaseSaleLeaseAccess();  //"继承"出售/出租基础模版

    /*出租 or 出售*/
    var sale_lease = g_taskData["SALE_LEASE"] == _SALE_LEASE["SALE"] ? true : false;

    /*是否为新版*/
    _http.setCookie(_coder.fromBase64( _local["USER_ACC"]["S_COOKIE"]));
    var version = _http.get("http://vip.anjuke.com/user/brokerhomeV2").regMatch("房源库") ? true : false;

    /*推广天数*/
    var spreadDayArr = ["1","2","3","5","7","15"];
    var spreadDay = spreadDayArr[_PUB_DAY_221];

    /*佣金比列*/
    var commissionArr = ["0.5","1.5","2.5","2.8","1.0"];
    var commission = commissionArr[_commission_221];

    /*发布站点*/
    var pubSiteArr = ["安居客","58同城","赶集网"];
    var pubSite ="";
    for (var i=1; i<=3; i++) {
        if (_PUB_SITE.join(',').isMatch(i.toString())) pubSite += pubSiteArr[i-1];
    }

    /*是否推广*/
    var spread = _PUB_POSITION;

    /*****************************************************
     功能描述:【Overwrite】转换房源数据
     参数说明: prog Number 进度量
     返回值  : Json 成功返回转换后的房源数据,失败返回null
     更改记录:  2016-04-11 王艺积 创建
     *****************************************************/
    access.convertHouseData = function (prog) {

        report(_TASK_STATE["RUNNING"], "房源信息初始化", parseInt(-0.10 * prog));

        var buildInfo = this.getBuildInfo();  //楼盘信息
        if (!buildInfo) return false;  //楼盘匹配失败
        var roomInfo = this.getRoomInfo(buildInfo[0]);  //房号   参数：楼盘id
        var direct = this.getDirect();  //朝向
        var decorate = this.getDecorate();  //装修
        var houseDesc = this.getHouseDesc();  //房源描述
        var tag = this.getTag();  //标签
        var matchSet = this.getMatchSet();  //配套设施

        report(_TASK_STATE["RUNNING"], "开始整理房源信息", parseInt(-0.10 * prog));

        var houseData = {
            "action": "publish",  //发布
            "fixPlanId": "",
            "broker_id": "7307036",
            "isTemp": "",
            "params_41": "",
            "bianHao": "",  //编号
            "community_unite": buildInfo[1],  //楼盘 or 小区名称
            "xiaoquId": buildInfo[0],   //小区id
            "shi": "2",  //室
            "ting": "2",  //厅
            "wei": "2",  //卫
            "params_16": "1",
            "zhuangXiuQingKuang": "2",  //装修
            "chaoXiang": "3",  //朝向
            "params_17": "1",
            "suoZaiLouCeng": "2",  //楼层
            "zongLouCeng": "7",  //共几层
            "params_19": "2",
            "params_82": "1",
            "params_20": "2",
            "params_83": "5",
            "params_21": "4502",  //几室 ps：2楼205室
            "picSourceParam": "",
            "mianJi": "85",  //面积
            "params_12": "76",  //室内面积
            "params_24": "1",
            "params_81": "3",
            "params_14": "2015",  //建筑年代
            "params_22": "1",
            "params_23": "",
            "params_26": "",
            "params_25": "",
            "params_18": "",
            "jiaGe": "120",  //价格 万元
            "params_28": "120",  //价格 万元
            "params_29": "0.5",  //佣金比例
            "params_372": "1",
            "title": "西峰丽景买三送一",  //标题
            "content_fangyuanxiangqing": "",  //房源详情
            "content_yezhuxintai": "",  //业主心态
            "content_fuwujieshao": "",  //服务介绍
            "params_35[]": "120",
            "params_35[]": "120",
            "params_36[]": "120",
            "params_36[]": "120",
            "params_36[]": "120",
            "hiddenLabelList[]": "add: [{\"name\":\"繁华地段\",\"value\":18556286}]",
            "defaultImgID": "772d6f9fd03f67672c0b2f212e9933e1",
            "picture_shineitu[]": "772d6f9fd03f67672c0b2f212e9933e1",  //室内图
            "picture_huxingtu[]": "772d6f9fd03f67672c0b2f212e9933e1",  //户型图
            "params_104[]": "772d6f9fd03f67672c0b2f212e9933e1",  //看房时间
            "params_344": "1"  //同意协议
        }

        switch (_fafaCom.getHouseAttr("HOUSE_USEAGE")) {  //发屋用途
            case 1:  //住宅

                print("住宅数据准备完成");
                break;
            case 2:  //别墅

                print("别墅数据准备完成");
                break;
            case 3:  //商铺

                print("商铺数据准备完成");
                break;
            case 4:  //写字楼

                print("写字楼数据准备完成");
                break;
            case 5:  //厂房

                print("厂房数据准备完成");
                break;
            case 6:  //仓库

                print("仓库数据准备完成");
                break;
            case 7:  //车库

                print("车库数据准备完成");
                break;
        }

        report(_TASK_STATE["RUNNING"], "房源信息准备完毕", parseInt(-0.50 * prog));

        return houseData;
    };

    /******************************** 数据准备相关函数 start ***************************************/

    /*****************************************************
     功能描述: 获取房屋朝向
     返回值  : String 朝向key
     *****************************************************/
    access.getDirect = function () {

    };

    /*****************************************************
     功能描述: 获取装修情况
     返回值  : String 朝向key
     *****************************************************/
    access.getDecorate = function () {

    };

    /*****************************************************
     功能描述: 获取楼盘信息
     返回值  : Array[楼盘id，楼盘名称]
     *****************************************************/
    access.getBuildInfo = function () {
        var buildName = _local["HOUSE_INFO"]["BUILD_NAME"];
        var buildID = _local["HOUSE_INFO"]["BUILD_ID"];
        var arr = [];  //临时数组

        var searchUrl = "http://vip.anjuke.com/ajax/community/unity/?type=esf?&q=" + _coder.toUrlEncoding(buildName);  //搜索房源url
        var searchRes = _http.get(searchUrl);

        var json = JSON.parse(searchRes);
        var data = json.data.items;  //楼盘数据组
        var length = Number(json.data.items.length);  //楼盘数据组长度

        if (length == 1) {
            print("楼盘精确匹配");
            return arr;
        } else if (length > 1) {
            for (var i in data) {
                if (buildID == data[i].id) {
                    return [buildID, buildName];
                }
            }
            print("楼盘用户自选");
            var a = _tool.select();
            return arr;
        } else {
            print("楼盘匹配失败");
            setLastError("BUILD_MATCH_ERROR", "BUILD_MATCH_ERROR", "请到三网合一申请新建楼盘信息");
            return false;
        }
    };



    /*****************************************************
     功能描述: 获取房号 附加面积
     返回值  : Array[栋，单元，房号，面积]
     *****************************************************/
    access.getRoomInfo = function (buildID,prog) {
        print("获取房号数据");

        var json = null;  // 临时json数据储存
        var checkUrl = "";  //验证url
        var arr = ["1","1","1",_local["HOUSE_INFO"]["HOUSE_AREA"]];  //返回数据

        var commId = buildID;

        var dongUrl = "http://vip.anjuke.com/search/communities/buildings?type=&commId=" + commId + "&kw=&time=" + new Date().getTime() + "&_=" + new Date().getTime();  //栋
        _http.setRequestHeader("Referer",dongUrl);
        var dongRes = _http.get(dongUrl);
        json = JSON.parse(dongRes);
        var items = json.data.items;

        try {
            var buildingsId = json.data.items[0].buildingId;  //获取 栋/楼id
            var buildingName = json.data.items[0].buildingName;
            print("buildingsId     "+buildingsId);
            arr[0] = buildingName;
        } catch (e) {
            print("获取栋id异常：" + e);
            return arr;
        }

        checkUrl = "http://apiwmda.58.com.cn/web/report?av=2&sv=0.1&ai="+commId+"&au=7ezsixze&d=52dac7852b843ccd29cfbeff8c2bf8cd&p=1&t=1556595382012&f=false&ca=_&b=Chrome&bv=73.0.3683&ua=Mozilla%2f5.0+(Windows+NT+5.1)+AppleWebKit%2f537.1+(KHTML%2c+like+Gecko)+Chrome%2f21.0.1180.89+Safari%2f537.1&res=1920*1080&o=Windows&ov=7&uk1=brokerId&uv1=7307036&uk2=cityId&uv2=15&ac=15565953820094c1&se=1556595179124-a993e3b3-eb80-b735&ety=1&et=1556595382011&pi=155659518505160aef&ep=BODY%20DIV.container%20DIV.publish%20FORM%23publish_form%20DIV%23buildingdictionary_a.ui-form.building-dictionary%20DIV.building-dictionary-box%20DIV.auto-container.building%20DIV.auto-wrap%20UL.auto-ul%20LI.auto-grayback&ev="+buildingName+"&ein=0";
        _http.get(checkUrl);

        _utils.sleep(200);
        var danyuanUrl = "http://vip.anjuke.com/search/communities/units?type=&commId=" + commId + "&buildingsId=" + buildingsId + "&kw=&time=" + new Date().getTime() + "&_=" + new Date().getTime();  //单元
        _http.setRequestHeader("Referer",danyuanUrl);
        var danyuanRes = _http.get(danyuanUrl);
        json = JSON.parse(danyuanRes);

        try {
            var unitsId = json.data.items[0].unitsId;  //获取 单元id
            var unitsName = json.data.items[0].unitsName;
            print("unitsId       "+unitsId);
            arr[1] = unitsName;
        } catch (e) {
            print("获取单元id异常：" + e);
            return arr;
        }

        checkUrl = "http://apiwmda.58.com.cn/web/report?av=2&sv=0.1&ai="+commId+"&au=7ezsixze&d=52dac7852b843ccd29cfbeff8c2bf8cd&p=1&t=1556595384143&f=false&ca=_&b=Chrome&bv=73.0.3683&ua=Mozilla%2f5.0+(Windows+NT+5.1)+AppleWebKit%2f537.1+(KHTML%2c+like+Gecko)+Chrome%2f21.0.1180.89+Safari%2f537.1&res=1920*1080&o=Windows&ov=7&uk1=brokerId&uv1=7307036&uk2=cityId&uv2=15&ac=1556595384138bab&se=1556595179124-a993e3b3-eb80-b735&ety=1&et=1556595384140&pi=155659518505160aef&ep=BODY%20DIV.container%20DIV.publish%20FORM%23publish_form%20DIV%23buildingdictionary_a.ui-form.building-dictionary%20DIV.building-dictionary-box%20DIV.auto-container.unit%20DIV.auto-wrap%20UL.auto-ul%20LI.auto-grayback&ev="+unitsName+"&ein=0";
        _http.get(checkUrl);

        _utils.sleep(200);
        var roomUrl = "http://vip.anjuke.com/search/communities/houses?type=&commId=" + commId + "&buildingsId=" + buildingsId + "&unitsId=" + unitsId + "&kw=&time=" + new Date().getTime() + "&_=" + new Date().getTime();  //房号
        _http.setRequestHeader("Referer",roomUrl);
        var roomRes = _http.get(roomUrl);
        json = JSON.parse(roomRes);

        try {
            var houseId = json.data.items[0].houseId;  //获取 房号id
            var houseNo = json.data.items[0].houseNo;
            print("houseId       "+houseId);
            arr[2] = houseNo;
        } catch (e) {
            print("获取房号id异常：" + e);
            return arr;
        }

        checkUrl = "http://apiwmda.58.com.cn/web/report?av=2&sv=0.1&ai="+commId+"&au=7ezsixze&d=52dac7852b843ccd29cfbeff8c2bf8cd&p=1&t=1556595385975&f=false&ca=_&b=Chrome&bv=73.0.3683&ua=Mozilla%2f5.0+(Windows+NT+5.1)+AppleWebKit%2f537.1+(KHTML%2c+like+Gecko)+Chrome%2f21.0.1180.89+Safari%2f537.1&res=1920*1080&o=Windows&ov=7&uk1=brokerId&uv1=7307036&uk2=cityId&uv2=15&ac=1556595385971bc0&se=1556595179124-a993e3b3-eb80-b735&ety=1&et=1556595385973&pi=155659518505160aef&ep=BODY%20DIV.container%20DIV.publish%20FORM%23publish_form%20DIV%23buildingdictionary_a.ui-form.building-dictionary%20DIV.building-dictionary-box%20DIV.auto-container.housenumber%20DIV.auto-wrap%20UL.auto-ul%20LI.auto-grayback%20SPAN&ev="+houseNo+"&ein=0";
        _http.get(checkUrl);

        _utils.sleep(200);
        var areaUrl = "http://vip.anjuke.com/communities/houses/info/?housesId=" + houseId + "&_=" + new Date().getTime();  //面积
        _http.setRequestHeader("Referer",areaUrl);
        var areaRes = _http.get(areaUrl);
        json = JSON.parse(areaRes);
        arr[3] = json.data.houseArea;

        report(_TASK_STATE["RUNNING"], "获取房号数据", parseInt(-0.5*prog));
        return arr;
    };

    /*****************************************************
     功能描述: 房源详情细化
     返回值  : Array [房源详情，业主心态，服务介绍]
     *****************************************************/
    access.getHouseDesc = function () {
        var desc = _fafaCom.getHousePureText();
        if (desc === "null") desc = _local["HOUSE_INFO"]["RICH_TEXT"];

        desc = _tools.toPlainText(desc);  //富文本转普通文本

        var descStr = _coder.fromUrlEncoding(desc);
        descStr = this.handleSensitiveWord(descStr);

        var arr = [];  //临时数组
        var temp = "";  //临时变量

        if (descStr.isMatch("房源详情")) {
            temp = descStr.regMatch("房源详情[:|：]([\\w\\W]+)业主心态");
            arr.push(temp);
        } else {
            arr.push(descStr);
        }

        if (descStr.isMatch("业主心态")) {
            temp = descStr.regMatch("业主心态[:|：]([\\w\\W]+)服务介绍");
            arr.push(temp);
        } else {
            arr.push("诚心出售，欢迎看房，随时恭候您的到来，恭候各位光临");
        }

        if (descStr.isMatch("服务介绍")) {
            temp = descStr.regMatch("服务介绍[:|：]([\\w\\W]+)");
            arr.push(temp);
        } else {
            arr.push("本人做房产多年，一直本着专业的房产知识，为您服务，我会在短的时间内帮您买好满意的房子，不让您错失任何好房子，更不让您每天为买房的事烦心");
        }

        return arr;
    };

    /*****************************************************
     功能描述: 获取房源标签
     返回值  : Array[楼盘id，楼盘名称]
     *****************************************************/
    access.getTag = function () {

    };

    /*****************************************************
     功能描述: 获取配套设施
     返回值  : Array[楼盘id，楼盘名称]
     *****************************************************/
    access.getMatchSet = function () {

    };


    /******************************** 数据准备相关函数 end ***************************************/

    /*****************************************************
     功能描述:【Overwrite】请求发布房源
     参数说明: prog 进度量， houseData Json 房源数据
     返回值  : houseID String 房源id,否则返回null
     更改记录: 2016-04-11 王艺积 创建
     *****************************************************/
    access.internalPub = function (prog, houseData) {
        _fafaCom.setPubWaitTime(45000);  //设置两条发布时间间隔，避免发布频繁
        var msg = "";  //显示给用户的信息
        var info = "";  //信息临时储存
        var json = "";  //json信息临时储存
        report(_TASK_STATE["RUNNING"], "开始发布", parseInt(-0.50 * prog));

        _http.clearPostData();
        _tools.addPostData(houseData, _http);
        var pubUrl = this.getPubUrl();  //发布url
        var pubRes = _http.post(pubUrl);

        /*不同发布对发布结果进行不同的处理*/
        switch (_fafaCom.getHouseAttr("HOUSE_USEAGE")) {  //发屋用途
            case 1:  //住宅
                pubUrl = sale_lease ? "" : "";
                print("住宅发布url：" + pubUrl);
                break;
            case 2:  //别墅
                pubUrl = sale_lease ? "" : "";
                print("别墅发布url：" + pubUrl);
                break;
            case 3:  //商铺
                pubUrl = sale_lease ? "" : "";
                print("商铺发布url：" + pubUrl);
                break;
            case 4:  //写字楼
                pubUrl = sale_lease ? "" : "";
                print("写字楼发布url：" + pubUrl);
                break;
            case 5:  //厂房
                if (sale_lease) {
                    pubUrl = "";
                } else {
                    print("");
                    setLastError();
                    return false;
                }
                print("厂房发布url：" + pubUrl);
                break;
            case 6:  //仓库
                pubUrl = sale_lease ? "" : "";
                print("仓库发布url：" + pubUrl);
                break;
            case 7:  //车库
                pubUrl = sale_lease ? "" : "";
                print("车库发布url：" + pubUrl);
                break;
        }

        var json = JSON.parse(pubRes);

        /*有302跳转情况*/
        if (_http.getStatusCode() == 302) {

            pubRes = "";
        }

        if (houseMsg.isMatch("code=207&act=publish")) {
            info = _coder.fromUrlEncoding(houseMsg.regMatch(/message=([\S]+)/));
            print("房源信息有误：" + info);
            setLastError("DATA_ERROR", "DATA_ERROR", "来自网页提示：" + info + "请到三网合一录入你的房源，查看具体提示！");
            return false;
        }

        if (json.data.title === "发布成功") {
            var houseId = json.data.houseId;

            msg = version ? "发布成功已保存到房源库。" : "发布成功。";  //三网合一新老版本提示

            print("=====================发布成功，开始上传视频=====================");

            try {
                this.uploadVideo(houseId);  //失败与否在函数里面判断
            } catch (e) {
                print("上传视频异常信息：" + e);
                report(_TASK_STATE["RUNNING"], "上传视频异常", parseInt(-0.10 * prog));
            }

            print("=====================发布成功，开始推广=====================");

            if (spread) {  //客户选择推广
                print("客户选择推广");
                if (pubSite.isMatch("58同城")) {  //客户选择了58同城
                    houseId = sale_lease ? houseId : this.get58zfId();
                    msg += this.spread58(houseId);
                } else {
                    print("客户未选择58同城");
                    msg += "您未选择58同城，未进行推广。";
                }
                if (pubSite.isMatch("安居客")) {  //客户选择了安居客
                    msg += this.spreadAjk(houseId);
                } else {
                    print("客户未选择安居客");
                    msg += "您未选择安居客，未进行推广。";
                }
            } else {  //客户未选择推广
                print("客户未选择推广");
                msg += "您未选择推广。";
            }
        }

        if (1) {

        }

        return {"WEB_ID": houseId, "EDIT_ID": houseId, "DELETE_ID": houseId, "MSG": msg};
    };

    /******************************** 发布相关函数 start ***************************************/

    /*****************************************************
     功能描述: 获取发布房源url
     返回值：  url String
     更改记录: 2019-4-25 佟春晖 创建
     *****************************************************/
    access.getPubUrl = function () {
        var pubUrl = "";  //发布url

        switch (_fafaCom.getHouseAttr("HOUSE_USEAGE")) {  //发屋用途
            case 1:  //住宅
                pubUrl = sale_lease ? "" : "";
                print("住宅发布url：" + pubUrl);
                break;
            case 2:  //别墅
                pubUrl = sale_lease ? "" : "";
                print("别墅发布url：" + pubUrl);
                break;
            case 3:  //商铺
                pubUrl = sale_lease ? "" : "";
                print("商铺发布url：" + pubUrl);
                break;
            case 4:  //写字楼
                pubUrl = sale_lease ? "" : "";
                print("写字楼发布url：" + pubUrl);
                break;
            case 5:  //厂房
                if (sale_lease) {
                    pubUrl = "";
                } else {
                    print("");
                    setLastError();
                    return false;
                }
                print("厂房发布url：" + pubUrl);
                break;
            case 6:  //仓库
                pubUrl = sale_lease ? "" : "";
                print("仓库发布url：" + pubUrl);
                break;
            case 7:  //车库
                pubUrl = sale_lease ? "" : "";
                print("车库发布url：" + pubUrl);
                break;
        }
        if (sale_lease) {  //出售
            switch (1) {  //房屋用途

            }
            // 南京、福州、合肥的发布页情况特殊考虑：
            // if (type == "安居客" && houseData["revisionFlag"] && g_taskData["SALE_LEASE"] == _SALE_LEASE["SALE"]) {
            //     url = "http://vip.anjuke.com/house/publish/ershou/?from=manage";
            // }
            // if (url) {
            //     url = url.replace("?&", "?");
            // }

            // if (access.officeFlag) {
            //     if (g_taskData["HOUSE_USEAGE"] == _USEAGE_DDINFO["OFFICE"]) {//发布写字楼出售到商业地产URL
            //         url = "http://vip.anjuke.com/house/publish/office/?jpChooseType=1";
            //         listUrl = "http://vip.anjuke.com/jp58/kcfyxz58";
            //     }
            //     if (g_taskData["HOUSE_USEAGE"] == _USEAGE_DDINFO["TRADE"]) {//发布商铺出售到商业地产URL
            //         url = "http://vip.anjuke.com/house/publish/shop/?jpChooseType=2";
            //         listUrl = "http://vip.anjuke.com/combo/broker/manage/jp/";
            //     }
            //     if (g_taskData["HOUSE_USEAGE"] == _USEAGE_DDINFO["MANUFACT"]) {//发布厂说房出售到商业地产URL
            //         url = "http://vip.anjuke.com/house/publish/factory/?jpChooseType=3&chooseWeb%5B%5D=2";
            //         listUrl = "http://vip.anjuke.com/jp58/kcfyxz58";
            //     }
            // } else {
            //     url = "http://vip.anjuke.com/house/publish/ershou/?";//出售
            //     listUrl = "http://vip.anjuke.com/combo/broker/manage/ajk/?from=V2";//出售
            // }
        } else {  //出租
            switch (1) {  //房屋用途

            }
            // if (access.officeFlag) {
            //     if (g_taskData["HOUSE_USEAGE"] == _USEAGE_DDINFO["OFFICE"]) {//发布写字楼出租到商业地产URL
            //         url = "http://vip.anjuke.com/house/publish/office/?jpChooseType=1";
            //         listUrl = "http://vip.anjuke.com/jp58/kcfyxz58";
            //     }
            //     if (g_taskData["HOUSE_USEAGE"] == _USEAGE_DDINFO["TRADE"]) {//发布商铺出租到商业地产URL
            //         url = "http://vip.anjuke.com/house/publish/shop/?jpChooseType=2";
            //         listUrl = "http://vip.anjuke.com/combo/broker/manage/jp/";
            //     }
            //     if (g_taskData["HOUSE_USEAGE"] == _USEAGE_DDINFO["MANUFACT"]) {//发布厂说房出租到商业地产URL
            //         url = "http://vip.anjuke.com/house/publish/factory/?jpChooseType=3&chooseWeb%5B%5D=2";
            //         listUrl = "http://vip.anjuke.com/jp58/kcfyxz58";
            //     }
            // } else {
            //     if (!houseData["revisionFlag"]) {
            //         url = "http://vip.anjuke.com/house/publish/rent/?"//出租
            //     } else {
            //         url = "http://vip.anjuke.com/house/publish/rent/?"
            //     }
            //     listUrl = "http://vip.anjuke.com/combo/broker/manage/hz/v2/?from=V1";//出租
            // }
        }
    };

    /*****************************************************
     功能描述:【Private】视频上传（只传入房源id，其他一切判定在函数内执行）
     参数：prog 进度量  房源id
     返回值：true or false
     更改记录：2019-4-22 佟春晖 创建
     *****************************************************/
    access.uploadVideo = function (prog, houseId) {
        var file = null;  //视频文件
        var houseType = "";  //房屋类型
        var sliceType = "";  //分片地址类型
        var domainType = "";  //域名类型

        if (sale_lease) {
            houseType = "newhouseesf";
            sliceType = "UcSrQpOnMUW";
            domainType = "1";
        } else {
            houseType = "zf";
            sliceType = "mLNJiHgFeDmP";
            domainType = "2";
        }

        print("=====================获取视频文件=====================");
        report(_TASK_STATE["RUNNING"], "获取视频文件",  parseInt(-0.10*prog));

        var videoAddr = _fafaCom.getHouseAttr("VIDEO_ADDR");  //视频地址
        if (videoAddr) {
            var fileName = _tools.getFileName(videoAddr);  //视频名称
            var videoDir = _cache.getPath("house_video");  //视频路径
            var videoPath = videoDir + "/" + fileName;  //视频地址

            // if (!_cache.hasFile(videoPath)) {
                videoAddr = videoAddr.replace("video4", "pic");  //老旧视频地址兼容
                print("download video:"+videoAddr);
                _cache.saveVideo(videoAddr);
            // }

            var refName = _cache.setRefFromFile(videoPath);  // 把文件转换成内存引用
            var fileSize = _cache.getRefMemSize(refName);  //获取视频的文件大小
            file = {
                'refName': refName,
                'videoPath': videoPath,
                'len': fileSize
            };
        }

        if (!file.len) return false;

        print("=====================打开上传视频首页=====================");

        var upload_page_url = "http://vip.anjuke.com/house/mediaUploadV2/" + houseType + "/" + houseId;  //上传视频首页
        var upload_page_res = _http.get(upload_page_url);

        print("=====================开始时间戳校验=====================");

        var time_check_url = "http://vip.anjuke.com/ajax/getmessage/?r=" + Math.random() + "&_=" + new Date().getTime();  //时间校验
        _http.get(time_check_url);

        print("=====================获取服务器返回文件名=====================");

        var server_video_name = "";  //服务器返回文件名
        var sign = "";  //用于上传权限认证

        var url = "http://vip.anjuke.com/ajax/house/mediaUpload?action=upload&type=" + houseType + "&uploadType=wos&fileType=mp4&type=" + houseType + "&t="+ new Date().getTime() +"&_=" + new Date().getTime();
        _http.setRequestHeader("Referer",upload_page_url);
        var res = _http.get(url);
        var json = JSON.parse(res);

        if (json.msg == "获取上传地址成功") {
            print("获取上传地址成功");
            server_video_name = json.data.path.substr(1);
            sign = json.data.sign;
        } else {
            print("获取上传地址失败");
            return false;
        }

        print("=====================开始分片上传=====================");
        report(_TASK_STATE["RUNNING"], "开始分片上传",  parseInt(-0.10*prog));

        var upload_video_url = "http://wosmediaupd"+ domainType +".anjukestatic.com/"+ sliceType +"/brokermedia/" + server_video_name;

        var file_size = file.len;  //视频大小

        var slice_size = 4194304;   // 最大分片数 4M
        var offset = 0;  //偏移量
        var datalen = 0;  //切片长度

        var quotient = parseInt(file_size / slice_size) + 1;  //商——分为多少段+1
        var remainder =  file_size % slice_size;   //余数——剩余文件大小

        var videoSlicerefName = "";  //文件拆分
        var videoSlicerefNames = [];  //切片储存
        var uploadparts = [];  //切片字段
        var path = "";  //单个切片缓存地址

        var sha = "";  //验证字段

        for (var i=0; i< quotient; i++) {
            offset = i * slice_size;
            datalen = i+1 == quotient ? remainder : slice_size;

            path = videoPath.replace(".mp4","") + "/slices/" + i + ".mp4";
            videoSlicerefName = _cache.getRefOfSlice(file.refName, offset , datalen);
            videoSlicerefNames.push(videoSlicerefName);
            _cache.saveFileFromRef(path, videoSlicerefName);
            sha = _coder.sha1(path, true);

            uploadparts.push({
                "offset": offset,
                "datalen": datalen,
                "datasha": sha
            });
        }
        if (quotient!=1) sha = "undefined";

        var alias = _tools.getFileName(videoPath) + "_" + new Date().getTime();
        var sha2 = "";  //用于 开始完成上传请求 使用
        var url = "";  //用于 开始完成上传请求 使用
        var session = "";  //用于分片上传权限认证;

        _http.clearPostData();
        _http.addPostData("op", "upload_precheck");
        _http.addPostData("filesize", file_size);
        _http.addPostData("slice_size", slice_size);
        _http.addPostData("uploadparts", JSON.stringify(uploadparts));
        _http.addPostData("ttl", "0");
        _http.addPostData("sha", sha);
        _http.addPostData("alias", alias);
        _http.setRequestHeader("Referer",upload_page_url);
        _http.setRequestHeader("User-Agent","Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.86 Safari/537.36");
        _http.setRequestHeader("Authorization",sign);
        var upload_video_res = _http.post(upload_video_url, 2);
        json = JSON.parse(upload_video_res);
        if (json.message == "SUCCESS") {
            session = json.data.session;
            if (session) {
                for (var i=0; i< quotient; i++) {
                    print("=====================开始第"+ (i+1) +"次分片上传=====================");
                    report(_TASK_STATE["RUNNING"], "视频第"+ (i+1) +"次分片上传",  parseInt(-0.10*prog));
                    _http.clearPostData();
                    _http.addPostData("op", "upload_slice_data");
                    _http.addPostData("session", session);
                    _http.addPostData("sha", uploadparts[i]["datasha"]);
                    _http.addPostData("offset", uploadparts[i]["offset"]);
                    _http.addPostData("filecontent", videoSlicerefNames[i], true, "application/octet-stream", true, "blob");
                    _http.setRequestHeader("Referer",upload_page_url);
                    _http.setRequestHeader("User-Agent","Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.86 Safari/537.36");
                    _http.setRequestHeader("Authorization",sign);
                    upload_video_res = _http.post(upload_video_url, 2);
                    json = JSON.parse(upload_video_res);
                    if (json.message == "SUCCESS") {
                        print("第"+ (i+1) +"次分片上传成功");
                    } else {
                        print("第"+ (i+1) +"次分片上传失败");
                        return false;
                    }
                }
                print("=====================最后分片汇总请求=====================");
                _http.clearPostData();
                _http.addPostData("op", "upload_slice_finish");
                _http.addPostData("filesize", file_size);
                _http.addPostData("session", session);
                _http.setRequestHeader("Referer",upload_page_url);
                _http.setRequestHeader("User-Agent","Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.86 Safari/537.36");
                _http.setRequestHeader("Authorization",sign);
                upload_video_res = _http.post(upload_video_url, 2);
                json = JSON.parse(upload_video_res);
                if (json.message == "SUCCESS") {
                    print("分片上传成功");
                    sha2 = json.data.sha2;
                    url= json.data.url;
                } else {
                    print("分片上传失败");
                    return false;
                }
            } else {
                sha2 = json.data.sha2;
                url= json.data.url;
                print("分片上传成功");
            }
        } else {
            print("分片上传失败");
            return false;
        }

        print("=====================开始完成上传请求=====================");

        var upload_complete_url = 'http://vip.anjuke.com/ajax/house/houseMediaV2?ac=uploadComplete&uploadType=wos';
        _http.clearPostData();
        _http.addPostData("ac", "uploadComplete");
        _http.addPostData("type", houseType);
        _http.addPostData("proId", houseId);
        _http.addPostData("access_url", url);
        _http.addPostData("resource_path", "/brokermedia/"+server_video_name);
        _http.addPostData("url", url);
        _http.addPostData("fileName", server_video_name);
        _http.addPostData("hash", sha2);
        _http.setRequestHeader("Referer",upload_page_url);
        _http.setRequestHeader("X-Requested-With","XMLHttpRequest");
        var upload_comlete_res = _http.post(upload_complete_url);

        json = JSON.parse(upload_comlete_res);
        if (json.msg == "视频上传成功") {
            var page = _http.get(upload_page_url);
            var msg = page.isMatch("上传成功，进入审核阶段") ? "上传成功，进入审核阶段" : "上传成功，转码中";
            print(msg);
            report(_TASK_STATE["RUNNING"], msg,  parseInt(-0.50*prog));
            return true;
        } else {
            return false;
        }
    };

    /*****************************************************
     功能描述: 获取58租房id
     返回值  : 58租房id
     更改记录: 2019-4-24 佟春晖 修改
     *****************************************************/
    access.get58zfId = function () {
        var listUrl = "http://vip.anjuke.com/zf58/kcfy58";
        var listPage = _http.get(listUrl);
        var wbhouseID = listPage.regMatch("http://tr.58.com/hezu/(\\d+)x.shtml");
        return wbhouseID;
    };

    /***************************************** 推广 start 包含在 发布相关函数 内 ******************************/

    /*****************************************************
     功能描述:【Private】58推广（只传入参数id，一切判定在函数内执行）
     参数说明: houseId string 房源id
     返回值  : string 推广结果
     更改记录: 2019-4-24 佟春晖 修改
     *****************************************************/
    access.spread58 = function (houseId) {
        var msg = "";  //返回信息
        var json = null;  //临时json数据存储

        print("=====================检查58推广条数=====================");
        var checkUrl = sale_lease ? "http://vip.anjuke.com/esf58/yxtg58" : "http://vip.anjuke.com/zf58/yxtg58";  // 58推广条数检查url
        var checkRes = _http.get(checkUrl);
        json = JSON.parse(checkRes);
        var number = json.data.wb.daishangjia;

        if (Number(number) > 0) {
            print("=====================开始58推广=====================");
            var spreadUrl = "http://vip.anjuke.com/separation/house/taocan/up?houseIds="+ houseId +"&platform=wb&pushDay="+ spreadDay +"&_=" + new Date().getTime();  //58推广url
            var spreadRes = _http.get(spreadUrl);
            json = JSON.parse(spreadRes);
            if (json.data.wb.status == "ok") {
                msg = "58推广成功。";
            } else {
                msg = "58推广失败，" + json.message + "。";
            }
        } else {
            msg = "58推广条数不足，推广失败。";
        }
        print(msg);
        return msg;
    };

    /*****************************************************
     功能描述:【Private】安居客推广（只传入参数id，一切判定在函数内执行）
     参数说明: houseId string 房源id
     返回值  : string 推广结果
     更改记录: 2019-4-24 佟春晖 创建
     *****************************************************/
    access.spreadAjk = function (houseId) {
        var msg = "";  //返回信息
        var checkUrl = "";  //安居客推广条数检查url
        var json = null;  //临时json数据存储

        if (!version) {
            print("！！！！！！老版本！！！！！");
            return "安居客推广失败。";
        }

        if (sale_lease) {  //出租
            checkUrl = "http://vip.anjuke.com/separation/taocan/status?_=" + new Date().getTime();
        } else {  //出租
            // checkUrl = "http://vip.anjuke.com/zf58/jpzw58";
            msg = "出租房58推广需要付费，而且费用不低，请告知客户是否意愿开启付费推广";
            return msg;
        }

        print("=====================检查安居客推广条数=====================");
        var checkRes = _http.get(checkUrl);
        json = JSON.parse(checkRes);
        var number = json.data.wb.daishangjia;

        if (Number(number) > 0) {
            print("=====================开始安居客推广=====================");
            var spreadUrl = "http://vip.anjuke.com/separation/house/taocan/up?houseIds="+ houseId +"&platform=wb&pushDay="+ spreadDay +"&_=" + new Date().getTime();  //58推广url
            var spreadRes = _http.get(spreadUrl);
            json = JSON.parse(spreadRes);
            if (json.data.wb.status == "ok") {
                msg = "安居客推广成功。";
            } else {
                msg = "安居客推广失败，" + json.message + "。";
            }
        } else {
            msg = "安居客推广条数不足，推广失败。";
        }
        print(msg);
        return msg;
    };

    /*****************************************************
     功能描述:【Private】赶集推广（只传入参数id，一切判定在函数内执行）
     参数说明: houseId string 房源id
     返回值  : string 推广结果
     更改记录: 2019-4-24 佟春晖 创建
     *****************************************************/
    access.spreadGj = function (houseId) {
        // 备用，现在三网合一已取消赶集操作
    };

    /***************************************** 推广 end ************************************************/

    /*****************************************************
     功能描述:【Private】敏感词处理
     参数说明:  标题或者描述
     返回值  : 返回处理后的标题或描述
     更改记录:
     2018-9-18 张雨 创建
     *****************************************************/
    access.handleSensitiveWord = function (describeTitle) {
        var sensitiveWord = ["收益", "升值", "回报", "可直接更名", "内价", "大唐", "赠送面积", "证件", "大牌", "抵账房", "制作", "无抵押贷款", "三中三", "一手更名", "千万", "尚城", "买一层", "学区", "优质", "福利彩票", "女同", "m9", "婴儿", "最低", "低价", "蛤蟆", "最繁华", "大牌", "qq", "制作", "周恩来", "孩子", "内部直销", "哥哥", "甲级", "首府", "学区", "3P", "星级", "土耳其", "av", "买一送一", "姐妹", "稀缺", "风情社区", "麻将机", "黄金地段", "果贷", "统战部", "部队家属院", "V信", "付款", "麻将机", "包房", "专业办证", "学区房", "理财", "投资", "风险", "夫妇", "刀把子"];
        //暂改成默认去除网页认为的敏感词再发布
        for (var i = 0; i < sensitiveWord.length; i++) {
            describeTitle = _fafaCom.filterSensitiveWord(sensitiveWord, describeTitle);
        }
        return describeTitle;
    };

    /*****************************************************
     功能描述:【Private】宁波校验房源（宁波需要房源核验编号，没有的话不能推广）
     参数说明: houseId string 房源id
     返回值  : 是宁波就进行校验，不是就不处理
     更改记录:
     2018-10-10 田文杨 创建
     *****************************************************/
    access.isVerification = function (houseId, webSite) {
        var verificate = true;
        if ((_local["SITE_INFO"]["CITY_CODE"] === "nb" || _local["SITE_INFO"]["CITY_ID"] === 96) && g_taskData["SALE_LEASE"] == _SALE_LEASE["SALE"]) {
            var verificate = this.verification(houseId, webSite);
            return verificate;
        } else {
            return verificate;
        }
    };
    /*****************************************************
     功能描述:【Private】宁波校验房源
     参数说明: houseId string 房源id
     返回值  : string 校验结果
     更改记录:
     2018-10-10 田文杨 创建
     *****************************************************/
    access.verification = function (houseId, webSite) {
        report(_TASK_STATE["RUNNING"], "房源校验中", 0);
        print("------------------进入房源校验码核对！！！！！！");
        var url = "",
            site = "",
            msg = "",
            reg = /"value":"(.*?)"/g,
            str_list = [],
            temp_str = "",
            page = "";
        url = "http://vip.anjuke.com/house/verification/" + webSite + "/esf/" + houseId;
        page = _http.get(url);
        while (temp_str = reg.exec(page)) {
            str_list.push(temp_str[1])
        }

        if (_fafaCom.getHouseAttr("CHECK_CODE_FUN") === null || _fafaCom.getHouseAttr("CONSIGN_NO") === null
            || _fafaCom.getHouseAttr("CHECK_CODE_FUN") === "" || _fafaCom.getHouseAttr("CONSIGN_NO") === "") {
            print("进入删除！！！！");
            // this.internalDel("", houseId);
            // setLastError("SITE_SERVER_EXCEPTION", "SITE_SERVER_EXCEPTION", "校验号或委托号缺失，校验失败！");
            return false;
        }
        _http.setRedirect(true);
        _http.clearPostData();
        _http.addPostData("verificationCode", _fafaCom.getHouseAttr("CHECK_CODE_FUN", ""));
        _http.addPostData("saleNumber", _fafaCom.getHouseAttr("CONSIGN_NO", ""));
        _http.addPostData("area", _fafaCom.getHouseAttr("HOUSE_AREA", "1"));
        _http.addPostData("action", "submit");
        _http.addPostData(str_list[0], str_list[1]);
        page = _http.post(url);

        if (page.isMatch("核验信息提交成功")) {
            _utils.sleep(3000);
            page = _http.get(url);
            if (page.isMatch("核验失败！经核验，委托合同不存在")) {
                // this.internalDel("", houseId);
                // setLastError("SITE_SERVER_EXCEPTION", "SITE_SERVER_EXCEPTION", "经核验，委托合同不存在！请检查核验信息！");
                return false;
            } else {
                return true;
            }
        } else {
            setLastError("SITE_SERVER_EXCEPTION", "SITE_SERVER_EXCEPTION", "同一时间提交校验码的房源太多了服务器开小差了，请稍后再试！");
            return false;
        }
    };

    /********************************* 发布相关函数 end *************************************/

    /*****************************************************
     功能描述:【Overwrite】请求刷新房源
     参数说明: prog Number 进度量，houseId 三好网合一
     返回值  : true or false
     更改记录: 2019-04-25 佟春晖 创建
     *****************************************************/
    access.internalRef = function (prog) {

    };

    /*****************************************************
     功能描述:【Overwrite】请求删除房源
     参数说明: prog Number 进度量，houseId 三好网合一
     返回值  : true or false
     更改记录: 2019-04-25 佟春晖 创建
     *****************************************************/
    access.internalDel = function (prog, houseId) {

    };

    /****************************************************
     功能描述: 设置响应异常提醒
     参数说明: line String 行数，msg String 异常提醒消息
     返回值:   成功：true，失败：false
     更改记录: 2019-3-28 佟春晖 创建
     ****************************************************/
    access.setResErrorMsg = function (line, msg) {
        if(_http.getStatusCode() == 0 || _http.getStatusCode() != 200){
			print("服务器异常，第" + line + "行：" + msg + "("+_http.getStatusCode()+"："+_http.getStatusDesc()+")");
			setLastError("SITE_SERVER_EXCEPTION","SITE_SERVER_EXCEPTION","服务器异常：" + msg + "("+_http.getStatusCode()+"："+_http.getStatusDesc()+")");
			return false;
		} else {
        	return true;
		}
    };

    /****************************************************
     功能描述: 设置返回异常提醒
     参数说明: code String 错误编码，line String 行数，msg String 异常提醒消息
     返回值:   false
     更改记录: 2019-3-28 佟春晖 创建
     ****************************************************/
    access.setBackErrorMsg = function (code, line, msg) {
		print("第" + line + "行：" + msg + "("+_http.getStatusCode()+"："+_http.getStatusDesc()+")");
		setLastError(code, code, msg + "("+_http.getStatusCode()+"："+_http.getStatusDesc()+")");
		return false;
    };

    return access;
}

