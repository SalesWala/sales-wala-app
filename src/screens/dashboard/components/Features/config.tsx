import ActivitiesIcon from '@src/assets/svgs/ActivitiesIcon';
import AttendanceIcon from '@src/assets/svgs/AttendanceIcon';
import BoxIcon from '@src/assets/svgs/BoxIcon';
import ExpenseIcon from '@src/assets/svgs/ExpenseIcon';
import OrdersIcon from '@src/assets/svgs/OrdersIcon';
import PartiesIcon from '@src/assets/svgs/PartiesIcon';
import ProductIcon from '@src/assets/svgs/ProductIcon';
import QuotationIcon from '@src/assets/svgs/QuotationIcon';
import ReportIcon from '@src/assets/svgs/ReportIcon';
import VisitsIcon from '@src/assets/svgs/VisitsIcon';

export interface FeaturesConfigType {
  title: string;
  darkColor: string;
  lightColor: string;
  logo: React.JSX.Element;
  route: string;
}
const featuresConfig: FeaturesConfigType[] = [
  {
    title: 'Quotations',
    darkColor: 'rgba(46, 210, 181, 1)',
    lightColor: 'rgba(207, 255, 238, 1)',
    logo: <QuotationIcon />,
    route: 'QuotationsScreen',
  },
  {
    title: 'Parties',
    darkColor: 'rgba(255, 230, 0, 1)',
    lightColor: 'rgba(255, 250, 204, 1)',
    logo: <PartiesIcon />,
    route: 'PartiesScreen',
  },
  {
    title: 'Orders',
    darkColor: 'rgba(82, 210, 46, 1)',
    lightColor: 'rgba(218, 255, 208, 1)',
    logo: <BoxIcon color="rgba(82, 210, 46, 1)" />,
    route: '',
  },
  {
    title: 'Products',
    darkColor: '#c686c6',
    lightColor: '#f2cbf2',
    logo: <ProductIcon height={30} width={30} color={'#c686c6'} />,
    route: 'ProductScreen',
  },


  {
    title: 'Attendance',
    darkColor: 'rgba(98, 112, 240, 1)',
    lightColor: 'rgba(199, 198, 255, 1)',
    logo: <AttendanceIcon />,
    route: 'AttendanceScreen',
  },

  {
    title: 'Expenses',
    darkColor: '#ffafcc',
    lightColor: '#ffc8dd',
    logo: <ExpenseIcon stroke={"#ffafcc"}/>,
    route: 'AttendanceScreen',
  },
  {
    title: 'Activities',
    darkColor: 'rgba(255, 135, 135, 1)',
    lightColor: 'rgba(255, 227, 227, 1)',
    logo: <ActivitiesIcon />,
    route: '',
  },

  {
    title: 'Reports',
    darkColor: 'rgba(255, 159, 69, 1)',
    lightColor: 'rgba(255, 224, 195, 1)',
    logo: <ReportIcon />,
    route: '',
  },
];

export default featuresConfig;
