'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError('');

        try {
            const res = await fetch('http://localhost:4000/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
                //credentials: 'include', // refreshToken 쿠키 받기 위해 필요
            });

            if (res.ok) {
                const data = await res.json();
                localStorage.setItem('accessToken', data.token);
                localStorage.setItem('userId', data.user.user_id);
                localStorage.setItem('username', data.user.username);
                router.push('/search?keyword=&page=1');
            } else {
                setError('아이디 또는 비밀번호가 올바르지 않습니다.');
            }
        } catch (err) {
            console.error(err);
            setError('서버와 연결할 수 없습니다.');
        }
    }

    return (
        <div className='flex justify-center items-center min-h-screen bg-gray-100'>
            <div className='bg-white shadow-lg rounded-2xl p-8 w-full max-w-md'>
                {/* 로고 */}
                <div className='flex justify-center mb-6'>
                    <img src='/logo_book.svg' alt='Kyobo Logo' className='h-10' />
                </div>

                <h1 className='text-2xl font-bold text-center text-gray-800 mb-4'>
                    교보문고 로그인
                </h1>
                <p className='text-sm text-gray-500 text-center mb-6'>
                    아이디와 비밀번호를 입력하세요.
                </p>

                {/* 로그인 폼 */}
                <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
                    <input
                        type='text'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder='아이디를 입력해 주세요.'
                        className='placeholder-gray-300 text-black border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500'
                        required
                    />

                    <input
                        type='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder='비밀번호를 입력해 주세요.'
                        className='placeholder-gray-300 text-black border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500'
                        required
                    />

                    {error && <p className='text-red-500 text-sm mt-2'>{error}</p>}

                    <button
                        type='submit'
                        className='bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors'
                    >
                        로그인
                    </button>
                </form>

                {/* 회원가입 & 비밀번호 찾기 */}
                <div className='flex justify-between items-center mt-6 text-sm text-gray-500'>
                    <button className='hover:text-green-600'>회원가입</button>
                    <button className='hover:text-green-600'>비밀번호 찾기</button>
                </div>
            </div>
        </div>
    );
}
