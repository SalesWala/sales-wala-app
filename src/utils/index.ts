import moment from "moment";

export const validateEmail = (email: string) => {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    return true;
  }
  return false;
};



export const genUID = (length: number) => {
  const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  let result = '';
    const charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}


export const parseServerDateToMoment = (serverDate: string | undefined) => {
  const formats = ["YYYY-MM-DD HH:mm:ss.SSSSSS Z","ddd MMM DD YYYY HH:mm:ss [GMT]Z"]
  return moment(serverDate, formats);

}


export const formatToCurrencyNumber = (amount: number) => {
  const USDollar = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'INR',
  });

  return USDollar.format(amount)
}