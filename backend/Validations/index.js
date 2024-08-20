import Joi from 'joi';


export const loginSchema = Joi.object({
    email: Joi.string().email().min(1).required(),
    password: Joi.string().min(8).max(30).required(),
}).unknown();

export const addUserSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    phone: Joi.string().required(),
    address: Joi.string(),
}).unknown();

export const addCategorySchema = Joi.object({
    name: Joi.string().required(),
}).unknown();

export const addProductSchema = Joi.object({
    name: Joi.string().required(),
    price: Joi.string().required(),
    category_id: Joi.string().required(),
    description: Joi.string().required(),
}).unknown();


export const updateUserSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().required(),
    street: Joi.string().allow(null),
}).unknown();

export const updateCategorySchema = Joi.object({
    name: Joi.string().required(),
}).unknown();


export const updateProductSchema = Joi.object({
    name: Joi.string().required(),
    price: Joi.string().required(),
    category_id: Joi.string().required(),
    description: Joi.string().required(),
}).unknown();