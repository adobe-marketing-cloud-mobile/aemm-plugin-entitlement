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

/**
 *  CQMEntitlementError.
 *  An error code assigned by an implementation when an error has occurred
 * @constructor
 */
var CQMEntitlementError = function(err) {
    this.code = (err !== undefined ? err : null);
};
// This needs to be synchronized with native implementations if there are changes
CQMEntitlementError.UNKNOWN_ERROR = 0;
CQMEntitlementError.NOT_SUPPORTED_ERROR = 1;
CQMEntitlementError.INVALID_ARGUMENT_ERROR = 10;
CQMEntitlementError.NETWORK_ERROR = 41;
CQMEntitlementError.NETWORK_RATE_LIMIT_EXCEEDED_ERROR = 42;
CQMEntitlementError.ENTITY_NOT_FOUND_ERROR = 61;
CQMEntitlementError.STORE_ERROR = 70;
CQMEntitlementError.STORE_PAYMENT_CANCELLED_ERROR = 71;
CQMEntitlementError.STORE_PRODUCT_NOT_AVAILABLE_ERROR = 72;
CQMEntitlementError.PROJECT_CONFIGURATION_ERROR = 81;

module.exports = CQMEntitlementError;

