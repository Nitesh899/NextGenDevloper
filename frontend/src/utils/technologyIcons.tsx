import type { IconType } from "react-icons";
import {
  FaReact,
  FaPython,
  FaNodeJs,
  FaJava,
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaDatabase,
  FaGitAlt,
  FaGithub,
  FaDocker,
  FaAndroid,
  FaApple,
} from "react-icons/fa";

import {
  SiDjango,
  SiTypescript,
  SiNextdotjs,
  SiTailwindcss,
  SiPostgresql,
  SiMongodb,
  SiMysql,
  SiThreedotjs,
  SiExpress,
  SiFirebase,
  SiVite,
  SiRedux,
  SiFlutter,
  SiKotlin,
  SiPhp,
  SiLaravel,
  SiFastapi,
} from "react-icons/si";

const TECHNOLOGY_ICONS: Record<string, IconType> = {
  FaReact: FaReact,
  FaPython: FaPython,
  FaNodeJs: FaNodeJs,
  FaJava: FaJava,
  FaHtml5: FaHtml5,
  FaCss3Alt: FaCss3Alt,
  FaJs: FaJs,
  FaDatabase: FaDatabase,
  FaGitAlt: FaGitAlt,
  FaGithub: FaGithub,
  FaDocker: FaDocker,
  FaAndroid: FaAndroid,
  FaApple: FaApple,

  SiDjango: SiDjango,
  SiTypescript: SiTypescript,
  SiNextdotjs: SiNextdotjs,
  SiTailwindcss: SiTailwindcss,
  SiPostgresql: SiPostgresql,
  SiMongodb: SiMongodb,
  SiMysql: SiMysql,
  SiThreedotjs: SiThreedotjs,
  SiExpress: SiExpress,
  SiFirebase: SiFirebase,
  SiVite: SiVite,
  SiRedux: SiRedux,
  SiFlutter: SiFlutter,
  SiKotlin: SiKotlin,
  SiPhp: SiPhp,
  SiLaravel: SiLaravel,
  SiFastapi: SiFastapi,
};

export function getTechnologyIcon(
  iconName?: string | null,
): IconType | null {
  if (!iconName) {
    return null;
  }

  return TECHNOLOGY_ICONS[iconName] ?? null;
}