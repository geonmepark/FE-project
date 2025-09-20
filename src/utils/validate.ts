export const phonePattern = /^\d{2,3}-?\d{3,4}-?\d{4}$/;

export const namePattern = /^[가-힣a-zA-Z]{2,10}$/;

export const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

export const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*\W)[A-Za-z\d\W]{10,24}$/;

export const userIdPattern = /^[a-z0-9]{6,18}$/;
