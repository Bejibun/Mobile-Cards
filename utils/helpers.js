import React from 'react'
import { AsyncStorage } from 'react-native'
import { red, orange, blue, lightPurp, pink, white } from './colors'
import { Notifications, Permissions } from 'expo';
// import * as HCONSTANT from './helperConstants';

export const NOTIFICATION_LOCAL_KEY = 'MobileCards:notification';

//Add Local Notification
export function addLocalNotification() {
  return {
    title: "Come and Play",
    body: "Take your Quiz Now!",

    android: {
      priority: 'low',
      sound: true,
      sticky: true,
      vibrate: true
    },
    ios: {
      sound: true
    }
  }
}

//Remove Local Notification
export function removeLocalNotification() {
  return AsyncStorage.removeItem(NOTIFICATION_LOCAL_KEY)
    .then(Notifications.cancelAllScheduledNotificationsAsync)
}
//Set Local Notification
export function setLocalNotification() {
  AsyncStorage.getItem(NOTIFICATION_LOCAL_KEY)
    .then(JSON.parse)
    .then(data => {
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS)
          .then(({ status }) => {
            if (status === 'granted') {
              Notifications.cancelAllScheduledNotificationsAsync();

              let tomorrow = new Date();
              tomorrow.setDate(tomorrow.getDate() + 1);
              tomorrow.setHours(20);
              tomorrow.setMinutes(0);

              Notifications.scheduleLocalNotificationAsync(
                addLocalNotification(),
                {
                  time: tomorrow,
                  repeat: 'day'
                }
              );
              AsyncStorage.setItem(NOTIFICATION_LOCAL_KEY, JSON.stringify(true));
            }
          });
      }
    })
}
