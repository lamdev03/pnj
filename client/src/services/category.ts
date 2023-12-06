import { ICategory} from '../common/type'
import instance from '../core/api'

const token=localStorage.getItem('accessToken');
export const getCategory = async () => {
    try {
        const response = await instance.get('/categories')
        return response.data
    } catch (error) {
        console.log(`['FETCH_CATEGORY_ERROR']`, error)
    }
}
export const updateCategory = async (cate: ICategory,id:number) => {
    try {
        const response = await instance.put(`/categories/${id}`, cate, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
        return response.data
    } catch (error) {
        console.log(`['UPDATE_CATEGORY_ERROR']`, error)
    }
}
export const addCategory = async (cate: ICategory) => {
    try {
        const response = await instance.post('/categories/', cate, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
        return response.data
    } catch (error) {
        console.log(`['ADD_CATEGORY_ERROR']`, error)
    }
}
export const deleteCategory = async (cate: ICategory) => {
    try {
        const response = await instance.delete(`/categories/${cate._id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
        return response.data
    } catch (error) {
        console.log(`['DELETE_CATEGORY_ERROR']`, error)
    }
}
