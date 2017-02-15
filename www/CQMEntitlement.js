/*
*  Copyright 2017 Adobe Systems Incorporated. All rights reserved.
*  This file is licensed to you under the Apache License, Version 2.0 (the "License");
*  you may not use this file except in compliance with the License. You may obtain a copy
*  of the License at http://www.apache.org/licenses/LICENSE-2.0
*
*  Unless required by applicable law or agreed to in writing, software distributed under
*  the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
*  OF ANY KIND, either express or implied. See the License for the specific language
*  governing permissions and limitations under the License.
*
*/

var argscheck = require('cordova/argscheck'),
    channel = require('cordova/channel'),
    exec = require('cordova/exec'),
    utils = require('cordova/utils'),
    cordova = require('cordova'),
    CQMEntitlementError = require('./entitlementError');

channel.createSticky('onCordovaEntitlementInfoReady');
// Tell cordova channel to wait on the cordovaEntitlementInfoReady event
channel.waitForInitialization('onCordovaEntitlementInfoReady');

/**
 * This represents the entitlement service, and provides methods to fetch offers, purchase offers and 
 * get entitlement information, etc.
 * @constructor
 */
function CQMEntitlement() {
    channel.onCordovaReady.subscribe(function() {
            channel.onCordovaEntitlementInfoReady.fire();
    });
}

/**
 * Get subscription info
 * This method will return the subscription info of current publicaiton and device. 
 * @param {Function} successCallback The function to call when the subscription info is retrieved 
 * @param {Function} errorCallback The function to call when there is an error getting the subscription info. (OPTIONAL)
 */
CQMEntitlement.prototype.getSubscriptionInfo = function(successCallback, errorCallback) {
    argscheck.checkArgs('fF', 'CQMEntitlement.getSubscriptionInfo', arguments);

    var fail = errorCallback && function(code) {
        var ce = new CQMEntitlementError(code);
        errorCallback(ce);
    };
    exec(successCallback, fail, "CQMEntitlement", "getSubscriptionInfo", []);
};

/**
 * Get offers
 * This method requests the available offers (products and subscriptions) for the specified collection.
 * @param {String} collectionName The name of the collection to fetch offers for
 * @param {Function} successCallback The function to call when the offers are retrieved 
 * @param {Function} errorCallback The function to call when there is an error getting the offers. (OPTIONAL)
 */
CQMEntitlement.prototype.getOffers = function(collectionName, successCallback, errorCallback) {
    argscheck.checkArgs('sfF', 'CQMEntitlement.getOffers', arguments);

    var collectionNameRegex = /^[a-zA-Z0-9]{1}[a-zA-Z0-9|_|\-|.]{0,63}$/;

    if (collectionNameRegex.test(collectionName) == false) {
        throw TypeError('Names must be limited to 64 characters. The value must start and end with a letter or number and can also contain dots, dashes, and underscores');
    }

    var fail = errorCallback && function(code) {
        var ce = new CQMEntitlementError(code);
        errorCallback(ce);
    };
    exec(successCallback, fail, "CQMEntitlement", "getOffers", [collectionName]);
};

/**
 * Purchase offer
 * This method initiates a purchase request
 * @param {String} productId The productId of the offer to purchase, could be a product offer or subscription offer.
 * @param {Function} successCallback The function to call when the purchase transaction completes.
 * @param {Function} errorCallback The function to call when there is an error completing the purchase. (OPTIONAL)
 */
CQMEntitlement.prototype.purchaseOffer = function(productId, successCallback, errorCallback) {
    argscheck.checkArgs('sfF', 'CQMEntitlement.purchaseOffer', arguments);

    var fail = errorCallback && function(code) {
        var ce = new CQMEntitlementError(code);
        errorCallback(ce);
    };
    exec(successCallback, fail, "CQMEntitlement", "purchaseOffer", [productId]);
};

/**
 * Restore purchases
 * This method will restore user's previous purchases. 
 * @param {Function} successCallback The function to call when the purchases are restored
 * @param {Function} errorCallback The function to call when there is an error restoring purchases. (OPTIONAL)
 */
CQMEntitlement.prototype.restorePurchases = function(successCallback, errorCallback) {
    argscheck.checkArgs('fF', 'CQMEntitlement.restorePurchases', arguments);

    var fail = errorCallback && function(code) {
        var ce = new CQMEntitlementError(code);
        errorCallback(ce);
    };
    exec(successCallback, fail, "CQMEntitlement", "restorePurchases", []);
};

module.exports = new CQMEntitlement();