import React from 'react';
import "./product.scss"
import axios from 'axios';
import { useParams } from 'react-router-dom';
import useAsync from '../customHook/useAsync'
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../config/contansts'

async function getProduct(id) {
    const response = await axios.get(`${API_URL}/product/${id}`)
    return response.data;
}
const ProductPage = (props) => {
    const navigate = useNavigate();

    // product /1
    const { id } = useParams();
    const [state] = useAsync(()=>getProduct(id), [id]);
    const { loading, data:product, error } = state;

    const productDel = () => {
        axios.delete(`${API_URL}/product/${id}`)
        .then(result=>{
            console.log("삭제되었습니다.");
            navigate("/");
        })
        .catch(e=> {
            console.log(e);
        })
    }
    if(loading) return <div>로딩중입니다.....</div>
    if(error) return <div>에러가 발생했습니다.</div>
    if(!product) return null;

    // useEffect(비동기 x)
    // const [ product, setProduct ] = useState(null);
    // // useParams() 실행되면 파라미터 값을 가지고 있는 객체를 반환
    // // product/1
    // const { id } = useParams();
    // // useEffect(function(){
    // //     axios.get(`http://localhost:3000/product/${id}`)
    // //     .then(result=> {
    // //         console.log(result);
    // //         const data = result.data;
    // //         setProduct(data);
    // //     })
    // //     .catch(e=> {
    // //         console.log(e);
    // //     })
    // // }, []) // 빈 배열 넣어줘야 마운트 될 때 한번만 시행
    // // if(!product) return <div>로딩중입니다...</div>

    return (
        <div className='inner'>
            <div id="image-box">
                <img src={product.imageUrl} alt =""/>
            </div>
            <div id="profile-box">
                <ul>
                    <li>
                        <div>
                            <img src="/images/icons/avatar.png" alt=""/>
                            <span>{product.seller}</span>
                        </div>
                    </li>
                    <li>
                    {product.name}
                    </li>
                    <li>
                        가격 {product.price}
                    </li>
                    <li>등록일</li>
                    <li>상세설명</li>
                    <li>{product.description}</li>
                </ul>
            </div>
            <div>
                <span onClick={productDel}>삭제하기</span>
            </div>
        </div>
    );
};

export default ProductPage;