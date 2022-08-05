import {body} from "express-validator";

export const registerValidation  = [
    body('email','Неверный формат почты').isEmail(),
    body('password','Пароль должен быть минимум 8 максимум 32 символа').isLength({min: 8, max: 32}),
    body('userName','Имя пользователя должно быть минимум 3 максимум 16 символа').isLength({min: 3, max: 32}),
]



export const userUpdateeValidation = [
    body('userName', '').isLength({ min: 3 }).isString(),
    body('text', 'Введите текст статьи').isLength({ min: 3 }).isString(),
    body('tags', 'Неверный формат тэгов').optional().isString(),
    body('imageUrl', 'Неверная ссылка на изображение').optional().isString(),
];

// export const photoCardCreateValidation = [
//     body('title', 'Введите заголовок статьи').isLength({ min: 3 }).isString(),
//     body('text', 'Введите текст статьи').isLength({ min: 3 }).isString(),
//     body('tags', 'Неверный формат тэгов').optional().isString(),
//     body('imageUrl', 'Неверная ссылка на изображение').optional().isString(),
// ];