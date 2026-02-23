export interface ClassInfo {
  id: string;
  name: string;
  description: string;
  riskLevel: string;
  commonIn: string;
  keyFeatures: string;
}

export type RiskSeverity = 'critical' | 'high' | 'moderate' | 'low';

export function getRiskSeverity(riskLevel: string): RiskSeverity {
  if (riskLevel.includes('Very High')) return 'critical';
  if (riskLevel.includes('High')) return 'high';
  if (riskLevel.includes('Moderate')) return 'moderate';
  return 'low';
}

export function getRiskBadgeStyles(severity: RiskSeverity): { bg: string; text: string; border: string; dot: string } {
  switch (severity) {
    case 'critical':
      return { bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200', dot: 'bg-red-500' };
    case 'high':
      return { bg: 'bg-red-50', text: 'text-red-600', border: 'border-red-200', dot: 'bg-red-400' };
    case 'moderate':
      return { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200', dot: 'bg-amber-500' };
    case 'low':
      return { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200', dot: 'bg-emerald-500' };
  }
}

export function getConfidenceColor(score: number): string {
  if (score >= 80) return 'text-emerald-600';
  if (score >= 50) return 'text-amber-600';
  return 'text-red-600';
}

export function getRiskLabel(severity: RiskSeverity): string {
  switch (severity) {
    case 'critical': return 'High Risk';
    case 'high': return 'High Risk';
    case 'moderate': return 'Moderate Risk';
    case 'low': return 'Low Risk';
  }
}

export const classInfoMap: Record<string, ClassInfo> = {
  akiec: {
    id: 'akiec',
    name: 'Actinic keratoses and intraepithelial carcinoma',
    description:
      "Actinic keratoses (AK) are rough, scaly patches caused by prolonged UV exposure. They are considered precancerous and can progress to squamous cell carcinoma if left untreated. Intraepithelial carcinoma (Bowen's disease) is an early form of squamous cell carcinoma confined to the epidermis.",
    riskLevel: 'Moderate — Precancerous',
    commonIn: 'Fair-skinned individuals with chronic sun exposure, typically over age 40',
    keyFeatures:
      'Rough, dry or scaly patches; pink to reddish-brown color; commonly found on sun-exposed areas (face, ears, hands)',
  },
  bcc: {
    id: 'bcc',
    name: 'Basal cell carcinoma',
    description:
      'Basal cell carcinoma (BCC) is the most common type of skin cancer. It arises from the basal cells in the lowest layer of the epidermis. BCC rarely metastasizes but can cause significant local tissue destruction if untreated. It is strongly associated with UV radiation exposure.',
    riskLevel: 'High — Malignant (rarely metastatic)',
    commonIn: 'Fair-skinned adults, especially those with a history of sunburns or chronic sun exposure',
    keyFeatures:
      'Pearly or waxy bumps; flat, flesh-colored or brown scar-like lesions; may have visible blood vessels; rolled borders',
  },
  bkl: {
    id: 'bkl',
    name: 'Benign keratosis-like lesions',
    description:
      'This category includes seborrheic keratoses, solar lentigines, and lichen planus-like keratoses. These are non-cancerous growths that appear as waxy, stuck-on lesions. While cosmetically bothersome, they are generally harmless and do not require treatment unless symptomatic.',
    riskLevel: 'Low — Benign',
    commonIn: 'Adults over age 50; prevalence increases with age',
    keyFeatures:
      'Waxy, stuck-on appearance; brown to black color; well-defined borders; variable texture from smooth to rough',
  },
  df: {
    id: 'df',
    name: 'Dermatofibroma',
    description:
      'Dermatofibromas are common, benign skin nodules of uncertain origin, possibly triggered by minor injuries like insect bites. They are firm, fibrous growths found most commonly on the legs. They are harmless and usually do not require treatment.',
    riskLevel: 'Low — Benign',
    commonIn: 'Young to middle-aged adults, more frequent in women',
    keyFeatures:
      'Firm, raised nodule; dimples inward when pinched (dimple sign); brown to reddish-brown; typically 0.5–1 cm in diameter',
  },
  mel: {
    id: 'mel',
    name: 'Melanoma',
    description:
      'Melanoma is the most dangerous form of skin cancer, arising from melanocytes (pigment-producing cells). It can develop from an existing mole or appear as a new dark spot. Early detection is critical, as melanoma can metastasize to other organs. The ABCDE rule (Asymmetry, Border, Color, Diameter, Evolving) is used for clinical assessment.',
    riskLevel: 'Very High — Malignant (can metastasize)',
    commonIn: 'All skin types; higher risk with UV exposure, family history, fair skin, and presence of many moles',
    keyFeatures:
      'Asymmetrical shape; irregular/blurred borders; multiple colors (brown, black, red, white, blue); diameter >6mm; evolving size or shape',
  },
  nv: {
    id: 'nv',
    name: 'Melanocytic nevi',
    description:
      'Melanocytic nevi (moles) are benign proliferations of melanocytes. They are extremely common and most people have 10–40 moles. While the vast majority are harmless, atypical or dysplastic nevi may have a slightly increased risk of developing into melanoma and should be monitored.',
    riskLevel: 'Low — Benign (monitor atypical nevi)',
    commonIn: 'All ages and skin types; typically appear in childhood and adolescence',
    keyFeatures:
      'Uniform color (tan, brown, or dark brown); round/oval shape; well-defined borders; usually <6mm; flat or raised',
  },
  vasc: {
    id: 'vasc',
    name: 'Vascular lesions',
    description:
      'Vascular lesions include cherry angiomas, angiokeratomas, pyogenic granulomas, and hemorrhage. They arise from blood vessels in the skin. Most are benign but some, like pyogenic granulomas, may bleed easily and require treatment. They present as red to purple spots or nodules.',
    riskLevel: 'Low — Usually benign',
    commonIn: 'All ages; cherry angiomas increase with age',
    keyFeatures:
      'Red, purple, or blue coloration; may be flat or raised; sharply demarcated; may blanch with pressure',
  },
};
