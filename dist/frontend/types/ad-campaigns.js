"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FunnelStatus = exports.TestVariant = exports.TestStatus = exports.CreativeType = exports.AdType = exports.AdStatus = exports.AdPlatform = void 0;
var AdPlatform;
(function (AdPlatform) {
    AdPlatform["FACEBOOK"] = "FACEBOOK";
    AdPlatform["INSTAGRAM"] = "INSTAGRAM";
    AdPlatform["GOOGLE_ADS"] = "GOOGLE_ADS";
    AdPlatform["TIKTOK"] = "TIKTOK";
    AdPlatform["LINKEDIN"] = "LINKEDIN";
    AdPlatform["TWITTER"] = "TWITTER";
    AdPlatform["YOUTUBE"] = "YOUTUBE";
    AdPlatform["SNAPCHAT"] = "SNAPCHAT";
    AdPlatform["PINTEREST"] = "PINTEREST";
})(AdPlatform || (exports.AdPlatform = AdPlatform = {}));
var AdStatus;
(function (AdStatus) {
    AdStatus["DRAFT"] = "DRAFT";
    AdStatus["ACTIVE"] = "ACTIVE";
    AdStatus["PAUSED"] = "PAUSED";
    AdStatus["COMPLETED"] = "COMPLETED";
    AdStatus["CANCELLED"] = "CANCELLED";
})(AdStatus || (exports.AdStatus = AdStatus = {}));
var AdType;
(function (AdType) {
    AdType["IMAGE"] = "IMAGE";
    AdType["VIDEO"] = "VIDEO";
    AdType["CAROUSEL"] = "CAROUSEL";
    AdType["STORY"] = "STORY";
    AdType["REEL"] = "REEL";
    AdType["TEXT"] = "TEXT";
})(AdType || (exports.AdType = AdType = {}));
var CreativeType;
(function (CreativeType) {
    CreativeType["IMAGE"] = "IMAGE";
    CreativeType["VIDEO"] = "VIDEO";
    CreativeType["CAROUSEL"] = "CAROUSEL";
    CreativeType["STORY"] = "STORY";
    CreativeType["REEL"] = "REEL";
})(CreativeType || (exports.CreativeType = CreativeType = {}));
var TestStatus;
(function (TestStatus) {
    TestStatus["RUNNING"] = "RUNNING";
    TestStatus["PAUSED"] = "PAUSED";
    TestStatus["COMPLETED"] = "COMPLETED";
    TestStatus["CANCELLED"] = "CANCELLED";
})(TestStatus || (exports.TestStatus = TestStatus = {}));
var TestVariant;
(function (TestVariant) {
    TestVariant["A"] = "A";
    TestVariant["B"] = "B";
    TestVariant["NONE"] = "NONE";
})(TestVariant || (exports.TestVariant = TestVariant = {}));
var FunnelStatus;
(function (FunnelStatus) {
    FunnelStatus["DRAFT"] = "DRAFT";
    FunnelStatus["ACTIVE"] = "ACTIVE";
    FunnelStatus["PAUSED"] = "PAUSED";
    FunnelStatus["COMPLETED"] = "COMPLETED";
})(FunnelStatus || (exports.FunnelStatus = FunnelStatus = {}));
//# sourceMappingURL=ad-campaigns.js.map