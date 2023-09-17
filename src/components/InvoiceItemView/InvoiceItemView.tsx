
import { TouchableOpacity, View } from "react-native"
import { AutocompleteDropdown } from "react-native-autocomplete-dropdown"
import SalesWalaText from "../SalesWalaText/SalesWalaText"
import { useGetColor } from "@src/hooks/useTheme"
import TrashIcon from "@src/assets/svgs/TrashIcon";
import SalesWalaInput from "../SalesWalaInput/SalesWalaInput"
import { forwardRef, useEffect, useImperativeHandle, useState } from "react"
import { useAppSelector } from "@src/redux/store"


interface InvoiceItemViewProps {
    id: string
    product: string | null,
    quantity: number,
    price: number,
    totalAmount: number
    onPressDelete: (id: string) => void
    onUpdateData: (id: string, price: string, finalAmount: string, quantity: string, selectedProductId: string) => void
}




const InvoiceItemView = forwardRef(({ id,

    onPressDelete,
    onUpdateData }: InvoiceItemViewProps, ref) => {
    const products = useAppSelector((state) => state.products.data)
    const productSugesstions = products.map(item => ({
        id: item.id,
        //@ts-ignore
        title: item.metadata.name
    }))






    // console.log({products:products[0].metadata})
    const dangerColor = useGetColor("danger")
    const borderColor = useGetColor("borderColor")

    const [qty, setQty] = useState("");
    const [price, setPrice] = useState("");
    const [total, setTotal] = useState("");

    const [unitName, setUnitName] = useState("")
    const [selectedProductId, setSelectedProductId] = useState("")

    const [formErrors, setFormErrors] = useState({
        productError: "",
        quantityError: "",
        priceError: "",
    })


    useEffect(() => {

        // id: string, price: string, finalAmount: string, quantity: string, selectedProductId: string


        if (selectedProductId) {
            setFormErrors({ ...formErrors, productError: "" })
        }
        onUpdateData(id, price, total, qty, selectedProductId)


    }, [qty, price, total, selectedProductId])




    useEffect(() => {
        if (selectedProductId) {
            const product = products.find((product) => {
                return product.id === selectedProductId
            })
            if (product) {
                //@ts-ignore
                setPrice(product.metadata.price.toString())
                //@ts-ignore
                setUnitName(`(in ${product.metadata.unit})`)
            }
        }
    }, [selectedProductId])

    useEffect(() => {
        const _total = Number(price) * Number(qty);
        if (_total.toString() === "0") {
            setTotal("")
        } else {
            setTotal(_total.toString())

        }
    }, [price, qty])
    useImperativeHandle(ref, () => ({
        validate() {
            return validateForm()
        }
    }));


    const validateForm = () => {
        let isValid = true;

        const errors = {
            productError: "",
            quantityError: "",
            priceError: "",
        }
        if (!selectedProductId) {
            errors.productError = "Please Select Product"
            isValid = false
        }

        if (!qty) {
            errors.quantityError = "Please Enter Quantity"
            isValid = false
        }

        if (!price) {
            errors.priceError = "Please Enter Price"
            isValid = false
        }

        setFormErrors(errors)
        return isValid
    }


    return <View style={{
        // flexDirection: "row",
        padding: 5,
        marginTop: 5,
        borderRadius: 10,
        borderStyle: "dashed",
        borderWidth: 1,
        borderColor: borderColor,
        backgroundColor: "#fff",
        paddingHorizontal: 10,
        paddingVertical: 10

    }}>

        <View>
            <View style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: 5,
            }}>
                <SalesWalaText fontSize={14} fontWeight='500'>
                    Item
                </SalesWalaText>

                <TouchableOpacity onPress={() => {
                    onPressDelete(id)
                }}>
                    <TrashIcon stroke={dangerColor} height={20} width={20} />
                </TouchableOpacity>
            </View>
            <AutocompleteDropdown
                clearOnFocus={false}
                closeOnBlur={true}
                closeOnSubmit={false}

                EmptyResultComponent={<SalesWalaText
                    style={{
                        paddingHorizontal: 10,
                        paddingVertical: 10
                    }}
                    fontSize={12} fontWeight='600' color='danger'>
                    Product Not Found
                </SalesWalaText>}




                renderItem={(item) => {
                    return <SalesWalaText  fontSize={14} style={{
                        paddingVertical: 8,
                        paddingHorizontal: 12,
                        borderRadius: 20,
                    }}>{item.title}</SalesWalaText>
                }}


                textInputProps={{
                    placeholder: 'Select Product',
                    autoCorrect: false,
                    autoCapitalize: 'none',

                    style: {
                        // paddingLeft: 18,
                        fontWeight: "600",
                        fontSize: 14,
                        // fontFamily: "poppins",
                        fontFamily: 'inter',
                        margin: 0,

                    },
                }}


                inputContainerStyle={{
                    borderRadius: 8,
                    paddingHorizontal: 0,
                    paddingVertical: 0,
                    margin: 0,
                    backgroundColor: "#fff",
                    borderWidth: 1,
                    borderColor: borderColor

                }}
                onSelectItem={(product) => {
                    if (product) {
                        setSelectedProductId(product.id)

                    }
                }}
                dataSet={productSugesstions}
            />
            {
                formErrors.productError && <SalesWalaText fontSize={12} fontWeight="700" color="danger">
                    {formErrors.productError}
                </SalesWalaText>
            }
        </View>



        <View style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 8
        }}>
            <View style={{ flex: 1, padding: 2, }}>
                <SalesWalaText fontSize={14} fontWeight='500' style={{}}>
                    Quantity
                </SalesWalaText>
                <SalesWalaInput
                    inputType="numeric"
                    placeholder={`Qty ${unitName}`}
                    value={qty}
                    onChange={(e) => {
                        setQty(e)
                        if (e) {
                            setFormErrors({ ...formErrors, quantityError: "" })
                        }
                    }} />
                {formErrors.quantityError && <SalesWalaText fontSize={12} fontWeight="700" color="danger">
                    {formErrors.quantityError}
                </SalesWalaText>
                }
            </View>


            <View style={{ flex: 1, marginHorizontal: 5 }}>
                <SalesWalaText fontSize={14} fontWeight='500' style={{}}>
                    Price
                </SalesWalaText>
                <SalesWalaInput
                    inputType="numeric"
                    placeholder="Price"
                    value={price}
                    onChange={(e) => {
                        setPrice(e)
                        if (e) {
                            setFormErrors({ ...formErrors, priceError: "" })
                        }
                    }}
                />
                {
                    formErrors.priceError && <SalesWalaText fontSize={12} fontWeight="700" color="danger">
                        {formErrors.priceError}
                    </SalesWalaText>
                }
            </View>


            <View style={{ flex: 1 }}>
                <SalesWalaText fontSize={14} fontWeight='500' style={{}}>
                    Total Amount
                </SalesWalaText>
                <SalesWalaInput
                    disabled
                    inputType="numeric"

                    placeholder="Total Amount"
                    value={total}
                    onChange={setTotal} />

            </View>



        </View>




    </View>
})


export default InvoiceItemView;

