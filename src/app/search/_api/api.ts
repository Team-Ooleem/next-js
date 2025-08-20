import axios from 'axios';

// types
import { Book } from '../_types/book';

// API 함수
export const fetchAutoCompleteBooks = async (keyword: string): Promise<Book[]> => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}api/autocomplete`, {
        params: {
            keyword,
        },
        headers: {
            Accept: 'application/json',
            'Cache-Control': 'no-cache',
        },
    });

    return response.data.books || [];
};
