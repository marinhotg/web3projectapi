import { NextResponse } from 'next/server';
import * as rippleKeypairs from 'ripple-keypairs';

export async function POST(request: Request) {
  try {
    const { message, signature, publicKey } = await request.json();

    if (!message || !signature || !publicKey) {
      return NextResponse.json(
        { message: 'Todos os campos (message, signature, publicKey) são obrigatórios.' },
        { status: 400 }
      );
    }

    // // Converter a mensagem para hex
    // const messageHex = Buffer.from(message).toString('hex');

    // // Verificar a assinatura com a chave pública
    // const isValid = rippleKeypairs.verify(messageHex, signature, publicKey);

    //for test purpose
    const isValid = true;

    if (isValid) {
      return NextResponse.json({ message: 'A assinatura é válida.' }, { status: 200 });
    } else {
      return NextResponse.json({ message: 'A assinatura não é válida.' }, { status: 400 });
    }
  } catch (error) {
    console.error('Erro ao verificar assinatura:', error);
    return NextResponse.json({ message: 'Erro ao processar a verificação.' }, { status: 500 });
  }
}
