
import background from '@/assets/success_payment_bg.png';
import jin from '@/assets/main.png'
import { Button } from '@/shared/ui/button';
import { useNavigate } from 'react-router-dom';

export const SuccessPyamentPage = () => {

    const navigate = useNavigate()

    return (
        // <Layout isWelcome={false} isHeading>
        <div className="flex flex-col items-center relative max-w-[90%] mx-auto mb-20">
            <img src={background} className='absolute' />
            <div className='z-50 flex flex-col items-center'>
                <span className='text-main text-[48px] font-bold mt-20'>Отлично!</span>
                <span className='text-black text-[32px] font-bold -mt-2'>Платеж принят</span>
                <img src={jin} alt="Jin" className='w-[350px] mt-8' />
                <p className='text-center text-[20px] mt-8'>И да прибудут с тобой фарт и собственники, которые готовые продать по цене, которую ты скажешь :)</p>
                <Button onClick={() => navigate(-1)} variant="secondary" className="w-full mt-8" text="Вернуться назад" />
            </div>
        </div>
        // </Layout>
    )
}
