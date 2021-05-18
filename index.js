/*
 * Copyright (C) 2017-2020 HERE Europe B.V.
 * Licensed under Apache 2.0, see full license in LICENSE
 * SPDX-License-Identifier: Apache-2.0
 */

import { GeoCoordinates } from "@here/harp-geoutils";
import { View } from "./View";



const app = new View({
    canvas: document.getElementById("map")
});

const mapView = app.mapView;

// make map full-screen
mapView.resize(window.innerWidth, window.innerHeight);

// react on resize events from the browser.
window.addEventListener("resize", () => {
    mapView.resize(window.innerWidth, window.innerHeight);
});

// center the camera to New York
mapView.lookAt({  target: new GeoCoordinates(52.5200, 13.4050),
  tilt: 45,
  zoomLevel: 16,
});
let heading = 0;
mapView.addEventListener(MapViewEventNames.Render, () => {
  mapView.lookAt({ heading });
  heading += 0.1;
});
mapView.beginAnimation();

/**
 * Calculates and displays a car route from the
 * Brandenburg Gate in the centre of Berlin
 * to Friedrichstraße Railway Station.
 *
 * https://developer.here.com/api-explorer/maps-js/servicesRouting/map-with-route-from-a-to-b
 *
 * @param   {H.service.Platform} platform A stub class to access HERE services
 */
 function calculateRoute(platform) {
    var router = platform.getEnterpriseRoutingService(),
      parameters = {
        waypoint0: '41.9798,-87.8801',
        waypoint1: '41.9043,-87.9216',
        mode: 'fastest;truck;',
        routeattributes: 'sh',
        maneuverattributes: 'di,sh'};
  
    router.calculateRoute(parameters,
      function (result) {
        alert(result);
      }, function (error) {
        alert(error);
      });
  }
       

// make sure the map is rendered
mapView.update();
