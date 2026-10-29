import LZString from 'lz-string';
import type { PlantAnalysisResult } from '../services/api';

/**
 * Minifies and compresses plant analysis data to fit into an ultra-compact URL
 * suitable for reliable, rapid mobile QR code scanning.
 */
export function compressPlantData(data: PlantAnalysisResult): string {
  const minified: Record<string, any> = {
    pn: data.plant_name,
    sn: data.scientific_name,
    h: data.health,
    d: data.disease,
    c: data.confidence,
    s: data.severity,
    ds: data.description,
    sym: data.symptoms,
    ca: data.cause,
    ot: data.organic_treatment,
    ct: data.chemical_treatment,
    w: data.water,
    sun: data.sunlight,
    f: data.fertilizer,
    rt: data.recovery_time,
    yl: data.yield_loss_risk,
    hw: data.harvest_waiting_period,
    tm: data.transmission_mode,
    qr: data.quarantine_radius,
    vc: data.vulnerable_crops,
    sd: data.soil_deficiency,
    sp: data.soil_ph_recommendation,
    gs: data.growth_stage,
    ps: data.pollinator_safety,
    st: data.spray_timing_window,
    pv: data.photosynthetic_vigor,
    vfc: data.visual_forensic_cues,
    ctp: data.cooling_tips,
    fw: data.favorable_weather,
    ttl: data.treatment_timeline,
  };

  // Strip empty keys to save precious bytes
  Object.keys(minified).forEach((key) => {
    if (minified[key] === undefined || minified[key] === null || minified[key] === '') {
      delete minified[key];
    }
  });

  return LZString.compressToEncodedURIComponent(JSON.stringify(minified));
}

/**
 * Decompresses and expands minified or legacy plant data back into PlantAnalysisResult.
 */
export function decompressPlantData(encoded: string): PlantAnalysisResult | null {
  if (!encoded) return null;
  try {
    const jsonStr = LZString.decompressFromEncodedURIComponent(encoded);
    if (!jsonStr) return null;
    const parsed = JSON.parse(jsonStr);

    // Minified format detection
    if (parsed.pn) {
      return {
        plant_name: parsed.pn,
        scientific_name: parsed.sn || '',
        health: parsed.h || 'Healthy',
        disease: parsed.d || 'None',
        confidence: typeof parsed.c === 'number' ? parsed.c : 95,
        severity: parsed.s || 'None',
        description: parsed.ds || '',
        detailed_reasoning: parsed.ds || '',
        symptoms: Array.isArray(parsed.sym) ? parsed.sym : [],
        cause: parsed.ca || '',
        prevention: Array.isArray(parsed.ot) ? parsed.ot : [],
        organic_treatment: Array.isArray(parsed.ot) ? parsed.ot : [],
        chemical_treatment: Array.isArray(parsed.ct) ? parsed.ct : [],
        water: parsed.w || '',
        sunlight: parsed.sun || '',
        fertilizer: parsed.f || '',
        recovery_time: parsed.rt || '',
        yield_loss_risk: parsed.yl,
        harvest_waiting_period: parsed.hw,
        transmission_mode: parsed.tm,
        quarantine_radius: parsed.qr,
        vulnerable_crops: parsed.vc,
        soil_deficiency: parsed.sd,
        soil_ph_recommendation: parsed.sp,
        growth_stage: parsed.gs,
        pollinator_safety: parsed.ps,
        spray_timing_window: parsed.st,
        photosynthetic_vigor: parsed.pv,
        visual_forensic_cues: parsed.vfc,
        cooling_tips: parsed.ctp,
        favorable_weather: parsed.fw,
        treatment_timeline: parsed.ttl,
      };
    }

    // Legacy unminified JSON format fallback
    return parsed as PlantAnalysisResult;
  } catch (err) {
    console.error("Failed to decode shared plant data", err);
    return null;
  }
}
