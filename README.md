<!--
# license: Licensed to the Apache Software Foundation (ASF) under one
#         or more contributor license agreements.  See the NOTICE file
#         distributed with this work for additional information
#         regarding copyright ownership.  The ASF licenses this file
#         to you under the Apache License, Version 2.0 (the
#         "License"); you may not use this file except in compliance
#         with the License.  You may obtain a copy of the License at
#
#           http://www.apache.org/licenses/LICENSE-2.0
#
#         Unless required by applicable law or agreed to in writing,
#         software distributed under the License is distributed on an
#         "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
#         KIND, either express or implied.  See the License for the
#         specific language governing permissions and limitations
#         under the License.
-->

# aemm-plugin-entitlement

This plugin defines a global `entitlement` object, which provides methods related to entitlement and purchase .
Although the object is in the global scope, it is not available until after the `deviceready` event.

    document.addEventListener("deviceready", onDeviceReady, false);
    function onDeviceReady() {
        console.log(typeof cq.mobile.entitlement);
    }

## Installation

cordova plugin add aemm-plugin-entitlement

## Object Properties
### Offer object Properties

| Name | Type | Notes |
| --- | --- | --- |
| productId         | String           | the product/subscription id user input in "Products&Subscription" dashboard |
| label         | String           |  the product/subscription name user input in "Products&Subscription" dashboard, will be null if not set by the user|
| description           | String  | the product/subscription description user input in "Products&Subscription" dashboard, will be null if not set by the user|
| price              | String           | price returned from the corresponding store, will be null if product is free |
| offerType         | String           | could be "product" or "subscription" |
| subscriptionType      | String           | could be "allAccess" or "standard", valid only if offertype is "subscription" |
| isFree   | Boolean           | true if the product is set as free in  "Products&Subscription" dashboard |

### SubscriptionInfo object Properties

| Name | Type | Notes |
| --- | --- | --- |
| subscriptionOffers         | Array           |  an array of Offer objects, would be empty if user has an active subscription|
| subscriptionState         | Object           |  an SubscriptionState object|

#### SubscriptionState object Properties
| Name | Type | Notes |
| --- | --- | --- |
| isSubscriber         | Boolean           |  true if the user has been a subscriber at any point in time (i.e. for past and active subscribers alike), note that subscriptionState.isSubscriber = subscriptionState.store.isSubscriber OR subscriptionState.integrator.isSubscriber|
| isActiveSubscriber         | Boolean           |  true if the user has an active subscription at this point in time, note that subscriptionState.isActiveSubscriber = subscriptionState.store.isActiveSubscriber OR subscriptionState.integrator.isActiveSubscriber|
| store         | Object           |  a Store object which contains subscription state to product store|
| integrator         | Object           |  an Integrator object which contains subsciption state to the integrator |

##### Store object Properties
| Name | Type | Notes |
| --- | --- | --- |
| isSubscriber         | Boolean           |  true if the user has been a subscriber at any point in time (i.e. for past and active subscribers alike)|
| isActiveSubscriber         | Boolean           |  true if the user has an active subscription at this point in time|
| expirationDate         | Number           |  the timestamp in milliseconds since the epoch, which represents when that subscription period ends, it could be null since not all subscriptions (both from the store and the integrator) have an expiration date. |
| subscriptionType         | String           |  could be "allAccess" or "standard", valid only if isSubscriber is true|
| id         | String           |  product id of the subscription product in the store|

##### Integrator object Properties
| Name | Type | Notes |
| --- | --- | --- |
| isSubscriber         | Boolean           |  true if the user has been a subscriber at any point in time (i.e. for past and active subscribers alike)|
| isActiveSubscriber         | Boolean           |  true if the user has an active subscription at this point in time|
| expirationDate         | Number           |  the timestamp in milliseconds since the epoch, which represents when that subscription period ends , it could be null since not all subscriptions (both from the store and the integrator) have an expiration date.|
| customData         | String           |  customData will not be set if the sibling isSubscriber is false. If isSubscriber is true, it may or may not be set. customData can be returned by the integrator. It is intended to contain data that is transparent to Adobe and only meaningful to the customer.|


## Methods

- entitlement.getSubscriptionInfo
- entitlement.getOffers
- entitlement.purchaseOffer
- entitlement.restorePurchases

## entitlement.getSubscriptionInfo

This method returns the subscription info for the current publication and device. 

| Parameter | Type | Description |
| --- | --- | ---|
| successCallback | Function | The success callback, which accepts a SubscriptionInfo object |
| errorCallback | Function | The error callback |

### Supported Platforms
- iOS, Android

### Quick Example

```javascript
function successCallback(subscriptionInfo)
{
    var offers = subscriptionInfo.subscriptionOffers;
	for(var i=0; i<offers.length; i++)
	{
		var offer = offers[i];
		console.log(offer.productId);
		console.log(offer.subscriptionType);
	}

	var subscriptionState = subscriptionInfo.subscriptionState;
}
function errorCallback(errorCode)
{
	console.log(errorCode);
}
cq.mobile.entitlement.getSubscriptionInfo(successCallback, errorCallback);
```

## entitlement.getOffers

This method requests the available offers (products and subscriptions) for the specified collection.

| Parameter | Type | Description |
| --- | --- | ---|
| collectionName | String | The name of the collection to fetch offers for, this must match the name found on Content Portal |
| successCallback | Function | The success callback,which accepts an array of Offer objects |
| errorCallback | Function | The error callback |

### Supported Platforms
- iOS, Android


### Quick Example
```javascript
var collectionName = "Collection X";
function successCallback(offers)
{
	for(var i=0; i<offers.length; i++)
	{
		var offer = offers[i];
		console.log(offer.productId);
		console.log(offer.offerType);
	}

}
function errorCallback(errorCode)
{
	console.log(errorCode);
}
cq.mobile.entitlement.getOffers(collectionName, successCallback, errorCallback);
```

## entitlement.purchaseOffer

This method initiates a purchase request.

| Parameter | Type | Description |
| --- | --- | ---|
| productId | String | The productId of the offer to purchase |
| successCallback | Function | The success callback |
| errorCallback | Function | The error callback |

### Supported Platforms
- iOS, Android

### Quick Example
```javascript
var productId = "com.org.product.productId1";
function successCallback()
{
	console.log("Purchase %s succeed", productId);
}
function errorCallback(errorCode)
{
	console.log(errorCode);
}
cq.mobile.entitlement.purchaseOffer(productId, successCallback, errorCallback);
```
## entitlement.restorePurchases

This method will initiate restore previous purchases for the user.

| Parameter | Type | Description |
| --- | --- | ---|
| successCallback | Function | The success callback |
| errorCallback | Function | The error callback |

### Supported Platforms
- iOS

### Quick Example
```javascript
function successCallback()
{
	console.log("Restore purchase succeed");
}
function errorCallback(errorCode)
{
	console.log(errorCode);
}
cq.mobile.entitlement.restorePurchases(successCallback, errorCallback);
```