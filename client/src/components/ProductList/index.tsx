import { Spin } from 'antd';
import { useSelector } from 'react-redux';
import { paymentFrequencies, plans } from '../../app/constants';

import './index.scss';

export const ProductList = () => {
    const products = useSelector((state: any) => state.products.products);
	const productLoading = useSelector((state: any) => state.products.loading);
	const productSearched = useSelector((state: any) => state.products.isSearched);

    return (
        <div className="ic__product-list">
            {productLoading ? (
                <Spin />
            ) : (
                productSearched && (!products.length ? (
                    <p>No product found.</p>
                ) : products.map((product: any) => (
                    <div className="ic__product-list--item">
                        <p>
                            <span>Product ID:</span>
                            <strong>{product.productId}</strong>
                        </p>
                        <p>
                            <span>Product Type:</span>
                            <strong>{product.productTypeCd}</strong>
                        </p>
                        <p>
                            <span>Product Family:</span>
                            <strong>{product.productFamilyCd}</strong>
                        </p>
                        <p>
                            <span>Base Sum Assured:</span>
                            <strong>${(product.baseSumAssured || '').toLocaleString()}</strong>
                        </p>
                        <p>
                            <span>Base Annual Premium:</span>
                            <strong>${(product.baseAnnualPremium || '').toLocaleString()}</strong>
                        </p>
                        <p>
                            <span>Product Term:</span>
                            <strong>{product.productTerm}</strong>
                        </p>
                        <p>
                            <span>Premium Paying Term:</span>
                            <strong>{product.premiumPayingTerm}</strong>
                        </p>
                        <p>
                            <span>Payment Frequency:</span>
                            <strong>{paymentFrequencies[product.paymentFrequencyCd] || '---'}</strong>
                        </p>
                        <p>
                            <span>Plan:</span>
                            <strong>{plans[product.planCode] || '---'}</strong>
                        </p>
                    </div>
                ))
            ))}
        </div>
    )
}