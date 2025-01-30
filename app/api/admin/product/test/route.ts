import { NextRequest, NextResponse } from 'next/server';
import { SERVER_URL } from '@/schema/Essentials';

export async function POST(request: NextRequest) {
  const authHeader = request.headers.get('Authorization')
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return NextResponse.json({ success: false, message: 'Missing or invalid Authorization header' }, { status: 401 })
  }
  
  const token = authHeader.split(' ')[1];    
  if (!token) {
    return NextResponse.json({  success: false, message: 'Invalid token' }, { status: 401 })
  }

  try {
   
const body = await request.json();
const apiResponse = await fetch(`${SERVER_URL}/tests`, {
  method: 'POST',
  headers: {
  'Authorization': `Bearer ${token}`,
  'Content-Type': 'application/json',
  },
  body: JSON.stringify(body),
});

if (!apiResponse.ok) {
  const errorData = await apiResponse.json();
  console.log(errorData)
  return NextResponse.json({ success: false, message: errorData.message, error: errorData.errors }, { status: apiResponse.status });
}

const data = await apiResponse.json();
return NextResponse.json({ success: true, message: 'Test Added Successfully', data });

} catch (error) {
console.error('Error:', error.message);

// Fallback error handling
return NextResponse.json({
  success: false,
  message: error.message || 'An unexpected error occurred',
}, { status: 500 });
}
}

export async function PATCH(request: NextRequest) {
  const authHeader = request.headers.get('Authorization')
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return NextResponse.json({ success: false, message: 'Missing or invalid Authorization header' }, { status: 401 })
  }
  
  const token = authHeader.split(' ')[1];    
  if (!token) {
    return NextResponse.json({  success: false, message: 'Invalid token' }, { status: 401 })
  }
 
  const searchParams = request.nextUrl.searchParams
  const id=searchParams.get('id');
  
  const body = await request.json();

    try {
    const apiResponse = await fetch(`${SERVER_URL}/tests/${id}`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${token}`,
  'Content-Type': 'application/json',

      },
  body: JSON.stringify(body),

    });

    if (!apiResponse.ok) {
      const errorData = await apiResponse.json();
      console.log(errorData)
      return NextResponse.json({ success: false, message: errorData.message, error: errorData.errors }, { status: apiResponse.status });
    }

    const data = await apiResponse.json();

    return NextResponse.json({ success: true, message: 'Update successful', data });
    
  } catch (error) {
    console.error('Error:', error.message);

    return NextResponse.json({
      success: false,
      message: error.message || 'An unexpected error occurred',
    }, { status: 500 });
  }
}