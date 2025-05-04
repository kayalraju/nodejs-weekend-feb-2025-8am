const categoryModel = require('../model/category')
const subcategoryModel = require('../model/subcategory')
const productModel = require('../model/product')


class LookupController {

    async createCategory(req, res) {
        const { categoryName} = req.body;
        const category = new categoryModel({
            categoryName,
        })
        await category.save()
        res.status(200).send({ message: "Category created successfully" })
    }



    async getCategory(req, res) {
        const category = await categoryModel.find()
        res.status(200).send({ category })
    }


    async createSubCategory(req, res) {
        const { categoryId, subCategoryNam } = req.body;
        const category = new subcategoryModel({
            categoryId,
            subCategoryNam,
        })
        await category.save()
        res.status(200).send({ message: "Sub Category created successfully" })
    }


    async getSubCategory(req, res) {
        const subcategory = await subcategoryModel.aggregate([
            {
                $lookup: {
                    from: 'categories',
                    localField: 'categoryId',
                    foreignField: '_id',
                    as: 'category'
                }
            },
            {
                $unwind: '$category'
            },
            {
                $project:{
                    subCategoryNam:1,
                    category:{
                       
                        categoryName:1,

                    }
                }
            }
        ])
        res.status(200).send({ subcategory })
       
        
    }


    async createProduct(req, res) {
        const { productName,productPrice,productDescription, categoryId, subCategoryId } = req.body;
        const product = new productModel({
            productName,
            productPrice,
            productDescription,
            categoryId,
            subCategoryId,
        })
        await product.save()
        res.status(200).send({ message: "Product created successfully" })
    }



    async getProduct(req, res) {
        // const product = await productModel.aggregate([
        //     {
        //         $lookup: {
        //             from: 'subcategories',
        //             localField: 'subCategoryId',
        //             foreignField: '_id',
        //             as: 'subcategory'
        //         }
        //     },
        //     {
        //         $unwind: '$subcategory'
        //     },
        //     {
        //         $lookup: {
        //             from: 'categories',
        //             localField: 'categoryId',
        //             foreignField: '_id',
        //             as: 'category'
        //         }
        //     },
        //     {
        //         $unwind: '$category'
        //     },
        //     {
        //         $project:{
        //             productName:1,
        //             productPrice:1,
        //             productDescription:1,
        //             subcategory:{
        //                 subCategoryNam:1,
        //                 category:{
        //                     categoryName:1,
        //                 }
        //             },
        //             category:{
        //                 categoryName:1,
        //             }
        //         }
        //     }
        // ])
        // res.status(200).send({ product })

        const Product=await productModel.aggregate([
            {
        
                $lookup: {
                    from: "subcategories",
                    localField: "subCategoryId",
                    foreignField: "_id",
                    as: "subCategoryDetails",
                    pipeline: [
                        {
                            $lookup: {
                                from: "categories",
                                localField: "categoryId",
                                foreignField: "_id",
                                as: "categoryDetails",
                            }
                        },
    
                    ],
                    
                }
            },
            
        ])

        res.status(200).send({Product})

    }

}


module.exports = new LookupController()