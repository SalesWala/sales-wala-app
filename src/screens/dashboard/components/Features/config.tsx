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





import attendanceIcon from "@src/assets/pngs/attendance.png"
import businessIcon from "@src/assets/pngs/business.png"
import expenseIcon from "@src/assets/pngs/expense.png"
import orderIcon from "@src/assets/pngs/order.png"
import productIcon from "@src/assets/pngs/product.png"
import reportIcon from "@src/assets/pngs/report.png"
import quotationIcon from "@src/assets/pngs/quotation.png"

export interface FeaturesConfigType {
  title: string;
  darkColor: string;
  lightColor: string;
  logo: React.JSX.Element;
  route: string;
  logoName: string;

}
const featuresConfig: FeaturesConfigType[] = [
  {
    title: 'Quotations',
    darkColor: 'rgba(46, 210, 181, 1)',
    lightColor: 'rgba(207, 255, 238, 1)',
    logo: quotationIcon,
    logoName:"quotation.png",
    route: 'QuotationsScreen',
  },
  {
    title: 'Parties',
    darkColor: 'rgba(255, 230, 0, 1)',
    lightColor: 'rgba(255, 250, 204, 1)',
    logo: businessIcon,
    route: 'PartiesScreen',
    logoName:"business.png",

  },
  {
    title: 'Orders',
    darkColor: 'rgba(82, 210, 46, 1)',
    lightColor: 'rgba(218, 255, 208, 1)',
    logo: orderIcon,
    route: '',
    logoName:"order.png",

  },
  {
    title: 'Products',
    darkColor: '#c686c6',
    lightColor: '#f2cbf2',
    logo: productIcon,
    route: 'ProductScreen',
    logoName:"product.png",

  },


  {
    title: 'Attendance',
    darkColor: 'rgba(98, 112, 240, 1)',
    lightColor: 'rgba(199, 198, 255, 1)',
    logo: attendanceIcon,
    route: 'AttendanceScreen',
    logoName:"attendance.png",

  },

  {
    title: 'Expenses',
    darkColor: '#ffafcc',
    lightColor: '#ffc8dd',
    logo: expenseIcon,
    route: '',
    logoName:"expense.png",

  },
  // {
  //   title: 'Activities',
  //   darkColor: 'rgba(255, 135, 135, 1)',
  //   lightColor: 'rgba(255, 227, 227, 1)',
  //   logo: <ActivitiesIcon />,
  //   route: '',
  // },

  {
    title: 'Reports',
    darkColor: 'rgba(255, 159, 69, 1)',
    lightColor: 'rgba(255, 224, 195, 1)',
    logo:reportIcon,
    route: '',
    logoName:"report.png",

  },
];

export default featuresConfig;
