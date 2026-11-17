'use client';

import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Coordinates } from '@/lib/types';

interface MapMarker {
  id: string;
  name: string;
  category?: string;
  coordinates: Coordinates;
  description?: string;
  price?: number;
  dayNumber?: number;
}

interface LeafletMapInnerProps {
  markers: MapMarker[];
  center?: Coordinates;
  zoom?: number;
  showPolyline?: boolean;
  height?: string;
}

export default function LeafletMapInner({
  markers,
  center = { lat: 39.6542, lng: 66.9597 },
  zoom = 7,
  showPolyline = true,
  height = '480px'
}: LeafletMapInnerProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        zoomControl: true,
        scrollWheelZoom: false,
      }).setView([center.lat, center.lng], zoom);

      // CartoDB Positron Luxury Tiles (clean, editorial, high-contrast)
      L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://carto.com/">Carto</a> &copy; OpenStreetMap',
        maxZoom: 19,
      }).addTo(map);

      mapInstanceRef.current = map;
    }

    const map = mapInstanceRef.current;

    // Clear existing marker layers
    map.eachLayer((layer) => {
      if (layer instanceof L.Marker || layer instanceof L.Polyline) {
        map.removeLayer(layer);
      }
    });

    const validMarkers = markers.filter(
      (m) => m.coordinates && typeof m.coordinates.lat === 'number' && typeof m.coordinates.lng === 'number'
    );

    const latLngs: L.LatLngTuple[] = [];

    validMarkers.forEach((m, idx) => {
      latLngs.push([m.coordinates.lat, m.coordinates.lng]);

      const customIcon = L.divIcon({
        className: 'custom-avelora-marker',
        html: `
          <div style="
            background: #172B25;
            color: #DFBF85;
            border: 2px solid #C6A36A;
            box-shadow: 0 4px 12px rgba(0,0,0,0.4);
            border-radius: 50%;
            width: 32px;
            height: 32px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 12px;
            font-weight: 700;
            font-family: sans-serif;
            cursor: pointer;
            transition: transform 0.2s;
          ">
            ${m.dayNumber ? `D${m.dayNumber}` : idx + 1}
          </div>
        `,
        iconSize: [32, 32],
        iconAnchor: [16, 16],
        popupAnchor: [0, -16]
      });

      const marker = L.marker([m.coordinates.lat, m.coordinates.lng], { icon: customIcon }).addTo(map);

      marker.bindPopup(`
        <div style="font-family: sans-serif; padding: 6px; min-width: 180px;">
          <h4 style="margin: 0 0 4px 0; color: #DFBF85; font-size: 14px; font-weight: 700;">${m.name}</h4>
          ${m.category ? `<span style="font-size: 10px; text-transform: uppercase; letter-spacing: 0.8px; color: #C6A36A; background: rgba(198,163,106,0.15); padding: 2px 6px; border-radius: 4px;">${m.category}</span>` : ''}
          ${m.description ? `<p style="margin: 6px 0 0 0; font-size: 11px; line-height: 1.4; color: #E0E0E0;">${m.description}</p>` : ''}
          ${m.price !== undefined ? `<div style="margin-top: 6px; font-size: 11px; font-weight: 600; color: #DFBF85;">Est. $${m.price}</div>` : ''}
        </div>
      `);
    });

    if (showPolyline && latLngs.length > 1) {
      L.polyline(latLngs, {
        color: '#C6A36A',
        weight: 3,
        opacity: 0.85,
        dashArray: '6, 8',
      }).addTo(map);
    }

    if (latLngs.length > 0) {
      const bounds = L.latLngBounds(latLngs);
      map.fitBounds(bounds, { padding: [40, 40], maxZoom: 14 });
    } else {
      map.setView([center.lat, center.lng], zoom);
    }
  }, [markers, center, zoom, showPolyline]);

  useEffect(() => {
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  return (
    <div
      ref={mapContainerRef}
      style={{ height, width: '100%', borderRadius: '1rem', overflow: 'hidden' }}
      className="z-0 border border-gold-500/30 shadow-2xl"
    />
  );
}

