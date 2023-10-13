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




const OKResponse = `message`



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

    ${OKResponse}
    }
}
`;





const ORGANISATION = `  
  id
  createdAt
  updatedAt
  name
  metadata
`







//////////// QUOTATION //////////



const QUOTATION = `
createdAt
updatedAt
id
vendorId
hasConvertedToOrder
metadata
orderState
organisationId
creatorId
quotationParticulars {
  createdAt
  updatedAt
  id
  metadata
  productId
  quotationId
}


`


export const CreateQuotation = gql`
 mutation CREATEQUOTATION($metadata:String,$vendorId:String!,$quotationParticulars:[QuotationParticularsInput!]!){
  createQuotation(data:{
    metadata:$metadata,
    vendorId:$vendorId,
    includedParticulars:$quotationParticulars
    
  }){
   ${QUOTATION}
  }
}
`;



export const UpdateQuotation = gql`
  mutation UpdateQuotation(
    $id: String!
    $metadata: String
    $addedParticulars: [QuotationParticularsInput!]!
    $modifiedParticulars: [QuotationParticularsInput!]!
    $deletedParticularsIds: [String!]!
  ) {
    updateQuotation(
      data: {
        id: $id
        metadata: $metadata
        addedParticulars: $addedParticulars
        modifiedParticulars: $modifiedParticulars
        deletedParticularsIds: $deletedParticularsIds
      }
    ) {
    
      deletedParticulars
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
   
    getMyVendors {
      ${VENDOR}
    } 
    getMyOrganisation{
      ${ORGANISATION}
    }

    getMyAttendances{
      ${ATTENDANCE}
    }
    
    getMyQuotations {
      ${QUOTATION}
    }
  }
`;