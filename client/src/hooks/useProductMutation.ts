import { joiResolver } from '@hookform/resolvers/joi'
import Joi from 'joi'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from 'react-query'
import { IProduct } from '../common/type'
import { addProduct, deleteProduct, updateProduct } from '../services/product'
type formControlDataType = {
    name: string
    price: number,  
    image:string,
    desc:string
}
// Định validate form sử dụng joi
const formSchema = Joi.object({
    name: Joi.string().min(2).max(50),
    price: Joi.number()
})

type useProductMutationProps = {
    action: 'ADD' | 'UPDATE' | 'DELETE'
    defaultValues?: IProduct
    onSuccess?: (deletedProductId?: any) => void
    dispatch?: React.Dispatch<any>;
}

export const useProductMutation = ({
    action,
    onSuccess,
    dispatch
}: useProductMutationProps) => {
    const queryClient = useQueryClient()

    const { mutate, ...rest } = useMutation({
        mutationFn: async (product: IProduct) => {
            switch (action) {
                case 'ADD':
                    return await addProduct(product)
                case 'UPDATE':
                    return await updateProduct(product,product._id!)
                case 'DELETE':
                    return await deleteProduct(product)
                default:
                    return null
            }
        },
        onSuccess: () => {
            onSuccess && onSuccess()
            queryClient.invalidateQueries({
                queryKey: ['PRODUCT']
            })
        }
    })
    const form = useForm({
        resolver: joiResolver(formSchema),
    })
    const onSubmit: SubmitHandler<formControlDataType> = (values) => {
        console.log(values)
        mutate(values)
    }
    const onRemove = (product: IProduct) => {
        mutate(product)
        console.log(product);
        if (dispatch) {
            console.log("thanh cong");
            
            dispatch({ type: 'DELETE_PRODUCT', payload: product._id });
        }
    }
    return {
        form,
        onSubmit,
        onRemove,
        ...rest
    }
}
