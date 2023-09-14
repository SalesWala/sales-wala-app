import { gql } from '@apollo/client';




//////// VENDOR ////////////////



const VENDOR = ` id
createdAt
updatedAt
metadata
`

export const GET_VENDORS = gql`
  query Vendor {
  getVendors{
   ${VENDOR}
  }
}
`;




export const CreateVendor = gql`
  mutation CreateVendor($name: String, $metadata: String) {
    createVendor(data: {name: $name, metadata: $metadata}) {
      ${VENDOR}

    }
  }
`;

export const UpdateVendor = gql`
  mutation UpdateVendor($name: String, $metadata: String, $id: String!) {
    updateVendor(data: {name: $name, metadata: $metadata, id: $id}) {
      ${VENDOR}

    }
  }
`;

//////// PRODUCTS ////////////////

const PRODUCT = `  id
metadata
defaultPrice
createdAt
updatedAt
isDisabled
`
export const GETALLPRODUCTS = gql`
  query GetProducts {
    getProducts {
     ${PRODUCT}
    }
  }
`;




//////////// Attendance //////////

const ATTENDANCE = `
    id
    createdAt
    updatedAt
    metadata
    punchInTime
    punchOutTime
    attendanceStatus
`


export const PUNCHINMutation = gql`
  mutation PunchIn($metadata:String!){
    punchIn(data:{metadata:$metadata}){
      ${ATTENDANCE}
    }
  }
`;


export const PUNCHOutMutation = gql`
  mutation PUNCHOUT{
    punchOut{

    ${ATTENDANCE}
    }
}
`;





const ORGANISATION = `  
  id
  createdAt
  updatedAt
  name
  email
  metadata
`







//////////// QUOTATION //////////



const QUOTATION = `
    id
    createdAt
    updatedAt
    orderState
    hasConvertedToOrder
    metadata
    vendorId
    quotationParticulars{
      id
      productId
      metadata
    }

`
export const CreateQuotation = gql`
 mutation CREATEQUOTATION($metadata:String,$vendorId:String!,$quotationParticulars:[QuotationParticularsInput!]!){
  createQuotation(data:{
    metadata:$metadata,
    vendorId:$vendorId,
    quotationParticulars:$quotationParticulars
    
  }){
   ${QUOTATION}
  }
}
`;







////// USERS/////////////


const USER = `
    createdAt
    updatedAt
    id
    firstname
    metadata
    lastname
    email
`;



export const LoginMutation = gql`
  mutation login($email: String!, $password: String!) {
    login(data: {email: $email, password: $password}) {
      accessToken
      refreshToken
    }
  }
`;

export const GetMeQuery = gql`
 query GET_ME{
  me{
    ${USER}
  }
}
`;



export const SYNC_DATA = gql`
  query syncData{
    me{
      ${USER}
    }
    getProducts{
      ${PRODUCT}
    }
    getVendors{
      ${VENDOR}
    }
    getMyOrganisation{
      ${ORGANISATION}
    }

    getMyAttendances{
      ${ATTENDANCE}
    }

  }
`;