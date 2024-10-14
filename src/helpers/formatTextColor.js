import { constants } from "../constants/index.js";
const { colors } = constants;

export const formatInverseColor = (text) =>
  `${colors.whiteBg}${text}${colors.reset}`;
export const formatPathColor = (text) => `${colors.blue}${text}${colors.reset}`;
export const formatSuccessColor = (text) =>
  `${colors.green}${text}${colors.reset}`;
export const formatWarningColor = (text) =>
  `${colors.yellow}${text}${colors.reset}`;
export const formatErrorColor = (text) => `${colors.red}${text}${colors.reset}`;
