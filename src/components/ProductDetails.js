import React, { useState ,  useEffect} from 'react';
import { useSelector , useDispatch  } from 'react-redux';
import { useParams } from 'react-router-dom';
import ImageSlider from '../shardComponents/ImageSlider';
import ProductDescription from '../shardComponents/ProductDescription';
import { addToCart } from '../redux/actions/cartActions';
import { toKebabCase } from '../pipes/pipe';


const ProductDetails = () => {
    const { id } = useParams();
    const products = useSelector((state) => state.product.products);
    
    const product = products.find(product => product.id === id);
    const dispatch = useDispatch();
    const [selectedAttributes, setSelectedAttributes] = useState({});

    useEffect(() => {
        if (product) {
            const initialAttributes = {};
            product.attributes.forEach(attribute => {
                initialAttributes[attribute.name] = attribute.items[0].value;
            });
            setSelectedAttributes(initialAttributes);
        }
    }, [product]);
    if (!product) {
        return <p>Product not found</p>;
    }

    

    const handleAttributeSelect = (attributeName, itemValue) => {
        setSelectedAttributes(prevAttributes => ({
            ...prevAttributes,
            [attributeName]: itemValue
        }));
    };

    const handleAddToCart = () => {
        const productWithSelectedAttributes = {
           // id: product.id
           ...product, 
            selectedAttributes
        };
        dispatch(addToCart(productWithSelectedAttributes));
       // console.log(productWithSelectedAttributes);
        // Here you can also dispatch an action to add the product to the cart
    };

    return (
        <div className="container mx-auto p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="md:w-full">
                    <ImageSlider data-testid='product-gallery' images={product.gallery} />
                </div>
                <div className="md:w-full">
                    <h1 className="text-2xl font-bold">{product.name}</h1>

                    {product.attributes.map((attribute, index) => (
                        <div className="mt-4" key={index}    data-testid={`product-attribute-${toKebabCase(attribute)}`}>
                            <h3 className="text-lg font-semibold">{attribute.name}</h3>
                            <div className="flex space-x-2" >
                                {attribute.items.map((item, itemIndex) => (
                                    attribute.name === 'Color' ?
                                        <button
                                            key={itemIndex}
                                            className={`w-6 h-6  ${selectedAttributes[attribute.name] === item.value ? 'border-2 border-green-600' : ''}`}
                                            style={{ backgroundColor: item.value }}
                                            onClick={() => handleAttributeSelect(attribute.name, item.value)}
                                          
                                        ></button>
                                        :
                                        <button
                                            key={itemIndex}
                                            className={`px-2 py-1 border rounded ${selectedAttributes[attribute.name] === item.value ? 'border-green-600' : ''}`}
                                            onClick={() => handleAttributeSelect(attribute.name, item.value)}
                                        >
                                            {item.displayValue}
                                        </button>
                                ))}
                            </div>
                        </div>
                    ))}

                    <div className="mt-4">
                        <h3 className="text-lg font-semibold">Price</h3>
                        <p className="text-lg font-medium text-gray-900 mt-2">
                            {product.prices.amount + product.prices.currency.symbol}
                        </p>
                    </div>

                    <div className="mt-4">
                        <h3 className="text-lg font-semibold">Description</h3>
                        <ProductDescription htmlString={product.description} data-testid='product-description' />
                    </div>
                    {product.inStock !== "0" ? (
                    <button
                        className="mt-4 px-4 py-2 bg-blue-500 text-white font-bold rounded"
                        onClick={handleAddToCart}
                        data-testid='add-to-cart'
                    >
                        Add to Cart
                    </button>
                    ) : null}
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
