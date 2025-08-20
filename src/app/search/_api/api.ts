import axios from 'axios';

// env
const API_URL = process.env.NEXT_PUBLIC_API_URL;

// types
import { Book } from '../_types/book';

// API 함수
export const fetchAutoCompleteBooks = async (
    keyword: string,
    searchType: 'title' | 'author',
): Promise<Book[]> => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}api/autocomplete`, {
        params: {
            keyword,
            type: searchType,
        },
        headers: {
            Accept: 'application/json',
            'Cache-Control': 'no-cache',
        },
    });

    return response.data.books || [];
};
