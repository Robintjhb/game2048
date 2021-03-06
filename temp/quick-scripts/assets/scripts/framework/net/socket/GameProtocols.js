(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/framework/net/socket/GameProtocols.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'ee9afyHSeJGaahOsOe7M5FZ', 'GameProtocols', __filename);
// scripts/framework/net/socket/GameProtocols.js

/**
 * Created by skyxu on 2018/10/9.
 */

"use strict";

/**
 * 消息基类对象，请求消息BaseRequest， 回调消息BaseResponse都继承BaseProtocol
 */

var BaseProtocol = cc.Class({
    ctor: function ctor() {
        /**
         * 请求动作类型
         */
        this.act = '';

        /**
         * 每个请求的sequence_id应该唯一
         */
        this.seq = 0;

        /**
         * 错误代码，0为正常
         */
        this.err = 0;

        /**
         * 是否需要等待服务器回调
         */
        this.is_async = false;
    }
});

/**
 * 请求消息基类，客户端的请求都继承这个类
 */
var BaseRequest = cc.Class({
    extends: BaseProtocol
});

/**
 * 服务器返回的消息对应的对象，包含返回数据，一般和BaseRequest成对使用
 * @class BaseResponse
 * @extends BaseProtocol
 */
var BaseResponse = cc.Class({
    extends: BaseProtocol,

    /**
     * 读取返回数据，设置BaseResponse对象
     */
    loadData: function loadData(data) {
        var key;
        for (key in data) {
            if (!this.hasOwnProperty(key)) {
                continue;
            }

            if (data[key] !== undefined && data[key] !== null) {
                this[key] = data[key];
            }
        }
    }
});

//-------------------------------------------------------
var HeartRequest = cc.Class({
    extends: BaseRequest,
    ctor: function ctor() {
        this.act = 'heart';
        this.t = -1; // 发送时间
    }
});

var HeartResponse = cc.Class({
    extends: BaseResponse,

    ctor: function ctor() {
        this.act = 'heart';
        this.t = -1;
    }
});
//-------------------------------------------------------
var RandomMatchRequest = cc.Class({
    extends: BaseRequest,
    ctor: function ctor() {
        this.act = "rmatch";
        this.uid = 0;
    }
});

var RandomMatchResponse = cc.Class({
    extends: BaseResponse,
    ctor: function ctor() {
        this.act = "rmatch";
        this.rid = 0; // 房间id
        this.black = 0; // 黑子uid
        this.other = 0; // 对手uid
        this.order = 0; // 走棋uid
    }
});
//-------------------------------------------------------
var CreateRoomRequest = cc.Class({
    extends: BaseRequest,
    ctor: function ctor() {
        this.act = "createRoom";
    }
});

var CreateRoomResponse = cc.Class({
    extends: BaseResponse,
    ctor: function ctor() {
        this.act = "createRoom";
        this.rid = 0;
    }
});
//-------------------------------------------------------
var JoinRoomRequest = cc.Class({
    extends: BaseRequest,
    ctor: function ctor() {
        this.act = "joinRoom";
        this.rid = 0;
    }
});
//-------------------------------------------------------
var PlayChessRequest = cc.Class({
    extends: BaseRequest,
    ctor: function ctor() {
        this.act = "playChess";
        this.cid = 0; // 棋子id (用来查找棋子)
        this.lastBedIndex = 0; // 最新的位置索引 (用来查找位置)
        this.dest = {
            index: 0,
            x: 0,
            y: 0
        };
    }
});

var PushPlayChess = cc.Class({
    extends: BaseResponse,
    ctor: function ctor() {
        this.order = 0; // 返回下一个走棋的uid
        this.act = "playChess";
        this.uid = 0;
        this.cid = 0;
        this.winner = 0; // 赢家uid
        this.dest = {
            index: 0,
            x: 0,
            y: 0
        };
    }
});
//-------------------------------------------------------
var ChatRequest = cc.Class({
    extends: BaseRequest,
    ctor: function ctor() {
        this.act = 'chat';
        this.msg = '';
        this.uid = '';
    }
});

var PushChat = cc.Class({
    extends: BaseResponse,
    ctor: function ctor() {
        this.act = 'chat';
        this.msg = '';
        this.uid = '';
    }
});
//-------------------------------------------------------
var SelectChessRequest = cc.Class({
    extends: BaseRequest,
    ctor: function ctor() {
        this.act = "selectChess";
        this.cid = 0;
    }
});

var PushSelectChess = cc.Class({
    extends: BaseResponse,
    ctor: function ctor() {
        this.act = "selectChess";
        this.cid = 0;
    }
});
//-------------------------------------------------------
var LoginRequest = cc.Class({
    extends: BaseRequest,

    ctor: function ctor() {
        this.act = 'login';

        /**
         * facebook用户的accessToken，或游客的UUID
         */
        this.token = '';

        /**
         * token来源，默认0:游客，1:facebook
         */
        this.origin = 0;

        /**
         * 平台: 必须为以下几种之一：android/ios/winphone/pc
         */
        this.os = '';

        /**
         * 平台系统版本
         */
        this.osVersion = '';

        /**
         * 设备产品型号, 示例 iPhone8,2, SM-G 9280
         */
        this.deviceModel = '';

        /**
         * 渠道ID
         */
        this.channelId = 0;

        /**
         * Ios设备广告标示符
         */
        this.idfa = '';

        /**
         * 安卓设备id
         */
        this.androidId = '';

        /**
         * Google广告平台账号，安装了google play的设备可取到
         */
        this.googleAid = '';

        /**
         * 应用版本号
         */
        this.appVersion = '';

        /**
         * 取package name或者bundle id
         */
        this.packName = '';

        /**
         * 设备语言
         * @type {string}
         */
        this.language = '';

        this.locale = "";

        this.uid = 0;
    }
});

var LoginResponse = cc.Class({
    extends: BaseResponse,

    ctor: function ctor() {
        this.act = 'login';

        /**
         * 游客第一次登录时返回的token，需要客户端保存
         */
        this.token = '';

        this.self = {
            isBlack: false,
            chessDic: {}
        };

        this.other = {
            isBlack: false,
            chessDic: {},
            uid: 0
        };

        this.order = 0;

        this.rid = 0;

        this.isReconn = false; // 是否断线重连
    }
});
//-------------------------------------------------------
var LogoutRequest = cc.Class({
    extends: BaseRequest,

    ctor: function ctor() {
        this.act = 'logout';
    }
});

var LogoutResponse = cc.Class({
    extends: BaseResponse,

    ctor: function ctor() {
        this.act = 'logout';
    }
});
//-------------------------------------------------------
/**
 * 绑定fb账号
 * @extends BaseRequest
 */
var BindFacebookRequest = cc.Class({
    extends: BaseRequest,

    ctor: function ctor() {
        this.act = 'bindFb';

        /**
         * facebook用户的accessToken，或游客的UUID
         */
        this.token = '';
    }
});
/**
 * 绑定fb账号
 * @extends BaseResponse
 */
var BindFacebookResponse = cc.Class({
    extends: BaseResponse,

    ctor: function ctor() {
        this.act = 'bindFb';

        /**
         * fb数据
         */
        this.me = 0;

        /**
         * fb好友
         */
        this.friends = 0;
    }
});
//-------------------------------------------------------
/**
 * 获取排名
 * @extends BaseRequest
 */
var RankRequest = cc.Class({
    extends: BaseRequest,

    ctor: function ctor() {
        this.act = 'rankboard';

        /**
         * 请求动作类型{ 0全部，1本地，2好友 }
         * @type {int}
         */
        this.type = 0;
    }
});
/**
 * 获取排名
 * @extends BaseResponse
 */
var RankResponse = cc.Class({
    extends: BaseResponse,

    ctor: function ctor() {
        this.act = 'rankboard';

        /**
         *  我的排名
         */
        this.myRank = 0;

        /**
         * 排名玩家数据
         */
        this.men = [];
    }
});

//----------------------only push------------------------
var PushExitRoom = cc.Class({
    extends: BaseResponse,

    ctor: function ctor() {

        this.act = 'exitRoom';

        this.uid = 0; // 退出玩家的uid
    }
});
//-------------------------------------------------------
/**
 * 推送消息 推送消息好友已赠送体力
 * @extends BaseResponse
 */
var PushSendSpResponse = cc.Class({
    extends: BaseResponse,

    ctor: function ctor() {
        this.act = 'sendSpNotify';

        /**
         * 好友对象
         */
        this.friend = null;
    }
});
//-------------------------------------------------------
/**
 * 推送消息 推送消息好友已领取赠送的体力
 * @extends BaseResponse
 */
var PushTakeSpResponse = cc.Class({
    extends: BaseResponse,

    ctor: function ctor() {
        this.act = 'takeSpNotify';

        /**
         * 好友对象
         */
        this.friend = null;
    }
});
//-------------------------------------------------------
/**
 * 推送消息 同步好友信息
 * @extends BaseResponse
 */
var PushSyncFriendInfo = cc.Class({
    extends: BaseResponse,

    ctor: function ctor() {
        this.act = 'friendInfoSync';

        /**
         * 好友
         */
        this.friend = null;
    }
});
//-------------------------------------------------------
/**
 * debug回调
 * @extends BaseRequest
 */
var DebugChangeMeRequest = cc.Class({
    extends: BaseRequest,

    ctor: function ctor() {

        this.act = "cmdTest"; //请求动作类型
        this.cmd = "";
        //  "player coins add 100", cmd格式：player field value 或者 player field add value
        //  Building field [add] value where playerId value type value
    }

});
/**
 * debug回调
 * @extends BaseResponse
 */
var DebugChangeMeResponse = cc.Class({
    extends: BaseResponse,

    ctor: function ctor() {
        this.act = "cmdTest";

        /**
         * 玩家数据
         * @type {Object}
         */
        this.me = {};

        /**
         * 体力恢复周期
         * @type {Number}
         */
        this.spInterval = null;

        /**
         * 体力恢复剩余时间
         * @type {Number}
         */
        this.spStepLeftTime = null;

        /**
         * 存钱罐速度
         * @type {Number}
         */
        this.farmDailyOut = null;

        /**
         * 存钱罐可回收金币
         * @type {Number}
         */
        this.farmCoins = null;

        /**
         * 存钱罐回收周期
         * @type {Number}
         */
        this.farmInterval = null;

        /**
         * 岛屿建筑数据
         * @type {Array}
         */
        this.buildings = null;
    }
});

var response_classes = {
    login: LoginResponse,
    logout: LogoutResponse,
    bindFb: BindFacebookResponse,
    rankboard: RankResponse,
    heart: HeartResponse,
    rmatch: RandomMatchResponse,
    createRoom: CreateRoomResponse,

    //push
    chat: PushChat,
    exitRoom: PushExitRoom,
    playChess: PushPlayChess,
    selectChess: PushSelectChess,
    sendSpNotify: PushSendSpResponse,
    takeSpNotify: PushTakeSpResponse,
    friendInfoSync: PushSyncFriendInfo,

    // debug
    cmdTest: DebugChangeMeResponse
};

module.exports = {
    LoginRequest: LoginRequest,
    LoginResponse: LoginResponse,
    LogoutRequest: LogoutRequest,
    LogoutResponse: LogoutResponse,
    BindFacebookRequest: BindFacebookRequest,
    BindFacebookResponse: BindFacebookResponse,
    RankRequest: RankRequest,
    RankResponse: RankResponse,
    HeartRequest: HeartRequest,
    HeartResponse: HeartResponse,
    ChatRequest: ChatRequest,
    RandomMatchRequest: RandomMatchRequest,
    RandomMatchResponse: RandomMatchResponse,
    PlayChessRequest: PlayChessRequest,
    SelectChessRequest: SelectChessRequest,
    CreateRoomRequest: CreateRoomRequest,
    CreateRoomResponse: CreateRoomResponse,
    JoinRoomRequest: JoinRoomRequest,

    // debug
    DebugChangeMeRequest: DebugChangeMeRequest,
    DebugChangeMeResponse: DebugChangeMeResponse,

    //push消息
    PushChat: PushChat,
    PushExitRoom: PushExitRoom,
    PushPlayChess: PushPlayChess,
    PushSendSpResponse: PushSendSpResponse,
    PushTakeSpResponse: PushTakeSpResponse,
    PushSyncFriendInfo: PushSyncFriendInfo,

    response_classes: response_classes
};

cc._RF.pop();
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=GameProtocols.js.map
        