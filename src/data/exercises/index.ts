import { CHAP1_EXERCISES } from './chap1_priorites';
import { CHAP2_EXERCISES } from './chap2_relatifs';
import { CHAP3_EXERCISES } from './chap3_fractions';
import { CHAP4_EXERCISES } from './chap4_proportionnalite';
import { CHAP5_EXERCISES } from './chap5_triangles';
import { CHAP6_EXERCISES } from './chap6_aires';
import { Exercise } from '../../types/math';

export const ALL_EXERCISES_BY_CHAPTER: Record<string, Exercise[]> = {
  'chap-1-priorites': CHAP1_EXERCISES,
  'chap-2-relatifs': CHAP2_EXERCISES,
  'chap-3-fractions': CHAP3_EXERCISES,
  'chap-4-proportionnalite': CHAP4_EXERCISES,
  'chap-5-triangles': CHAP5_EXERCISES,
  'chap-6-aires': CHAP6_EXERCISES,
};

export {
  CHAP1_EXERCISES,
  CHAP2_EXERCISES,
  CHAP3_EXERCISES,
  CHAP4_EXERCISES,
  CHAP5_EXERCISES,
  CHAP6_EXERCISES,
};
