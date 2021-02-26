"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EntryTypes = exports.HealthCheckRating = exports.Gender = void 0;
var Gender;
(function (Gender) {
    Gender["Male"] = "Male";
    Gender["Female"] = "Female";
    Gender["Other"] = "Other";
})(Gender = exports.Gender || (exports.Gender = {}));
var HealthCheckRating;
(function (HealthCheckRating) {
    HealthCheckRating[HealthCheckRating["Healthy"] = 0] = "Healthy";
    HealthCheckRating[HealthCheckRating["LowRisk"] = 1] = "LowRisk";
    HealthCheckRating[HealthCheckRating["HighRisk"] = 2] = "HighRisk";
    HealthCheckRating[HealthCheckRating["CriticalRisk"] = 3] = "CriticalRisk";
})(HealthCheckRating = exports.HealthCheckRating || (exports.HealthCheckRating = {}));
var EntryTypes;
(function (EntryTypes) {
    EntryTypes["Hospital"] = "Hospital";
    EntryTypes["OccupationalHealthcare"] = "OccupationalHealthcare";
    EntryTypes["HealthCheck"] = "HealthCheck";
})(EntryTypes = exports.EntryTypes || (exports.EntryTypes = {}));
