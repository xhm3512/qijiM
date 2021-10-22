import React, { ComponentType, SVGProps } from 'react';
import Icon from '@ant-design/icons';
import { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon';
const CustomIcon = (
  Component: ComponentType<CustomIconComponentProps | SVGProps<SVGSVGElement>>,
) => (props: any) => {
  console.log(34, props);

  return <Icon component={Component} {...props}></Icon>;
};
import AccountExitCustomTemp from './AccountExitCustom'; //img
import CheckBoxCustomTemp from './CheckBoxCustom';
import CryingFaceTemp from './CryingFace';
import DataSvgTemo from './DataSvg';
import NewsSvgTemp from './NewsSvg';
import AddTemp from './Add';
import NextTemp from './Next';
import PrveTemp from './Prve';
import SalaryTemp from './Salary';
import TipsTemp from './Tips';
import UserTemp from './User';
import MangersTemp from './Mangers';

const AccountExitCustom = CustomIcon(AccountExitCustomTemp);
const CheckBoxCustom = CustomIcon(CheckBoxCustomTemp);
const CryingFace = CustomIcon(CryingFaceTemp);
const DataSvg = CustomIcon(DataSvgTemo);
const NewsSvg = CustomIcon(NewsSvgTemp);
const Add = CustomIcon(AddTemp);
const Next = CustomIcon(NextTemp);
const Prve = CustomIcon(PrveTemp);
const Salary = CustomIcon(SalaryTemp);
const Tips = CustomIcon(TipsTemp);
const User = CustomIcon(UserTemp);
const Mangers = CustomIcon(MangersTemp);
export default {
  AccountExitCustom,
  CheckBoxCustom,
  CryingFace,
  DataSvg,
  NewsSvg,
  Add,
  Next,
  Prve,
  Salary,
  Tips,
  User,
  Mangers,
};
