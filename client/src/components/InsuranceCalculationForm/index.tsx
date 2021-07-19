import React from 'react';
import {
    Form,
    Input,
    Button,
    Radio,
    DatePicker,
    Select,
    InputNumber
} from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import { fetchProducts } from '../../features/products/productsSlice';

import './index.scss';
import { paymentFrequencies, plans } from '../../app/constants';

const { Option } = Select;

export const InsuranceCalculationForm = () => {
    const [calculationType, setCalculationType] = React.useState('assured');

    const productLoading = useSelector((state: any) => state.products.loading);

    const dispatch = useDispatch();

    const handleChangeCalculationType = (event: any) => {
        setCalculationType(event.target?.value);
    }

    const handleInsuranceCalculation = async (data: any) => {

        const payload = {
            ...data
        };

        if (calculationType === 'assured') {
            delete payload.saPerYear;
        }

        await dispatch(
            fetchProducts(payload)
        );
    }

    return (
        <div className="ic__welcome--form">
            <Form
                name="basic"
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 24 }}
                initialValues={{
                    type: calculationType,
                    genderCd: 'MALE',
                    planCode: 'T11A20',
                    paymentFrequency: 'YEARLY'
                }}
                onFinish={handleInsuranceCalculation}
            >
                <Form.Item
                    label="Calculation Type"
                    name="type"
                >
                    <Radio.Group onChange={handleChangeCalculationType}>
                        <Radio value='assured'>Assured Calculation</Radio>
                        <Radio value='premium'>Premium Calculation</Radio>
                    </Radio.Group>
                </Form.Item>

                <Form.Item
                    label="Name"
                    name="firstAndSurname"
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Gender"
                    name="genderCd"
                >
                    <Radio.Group>
                        <Radio value='MALE'>Male</Radio>
                        <Radio value='FEMALE'>Female</Radio>
                    </Radio.Group>
                </Form.Item>

                <Form.Item
                    label="Date of birth"
                    name="dob"
                    rules={[{ required: true, message: 'Please choose your date of birth' }]}
                >
                    <DatePicker style={{width: '100%'}} placeholder="Date of birth in YYYY-MM-DD" />
                </Form.Item>

                <Form.Item
                    label="Plan"
                    name="planCode"
                    rules={[{ required: true, message: 'Please choose a plan' }]}
                >
                    <Select>
                        {Object.keys(plans || {}).map(planCode => (
                            <Option value={planCode}>{plans[planCode]}</Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item
                    label="Premium per year"
                    name="premiumPerYear"
                    rules={[{ required: true, message: 'Please input premium per year' }]}
                >
                    <InputNumber
                        formatter={(value: any) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        parser={(value: any) => (value || '').replace(/\$\s?|(,*)/g, '')}
                        style={{width: '100%'}}
                    />
                </Form.Item>

                <Form.Item
                    label="Payment Frequency"
                    name="paymentFrequency"
                    rules={[{ required: true, message: 'Please choose payment frequency' }]}
                >
                    <Select>
                        {Object.keys(paymentFrequencies || {}).map(paymentFrequency => (
                            <Option value={paymentFrequency}>{paymentFrequencies[paymentFrequency]}</Option>
                        ))}
                    </Select>
                </Form.Item>

                {calculationType === 'premium' && (
                    <Form.Item
                        label="Sum assured per year"
                        name="saPerYear"
                        rules={[{ required: true, message: 'Please input sum assured per year' }]}
                    >
                        <InputNumber
                            formatter={(value: any) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                            parser={(value: any) => (value || '').replace(/\$\s?|(,*)/g, '')}
                            style={{width: '100%'}}
                        />
                    </Form.Item>
                )}

                <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
                    <Button type="primary" htmlType="submit" loading={productLoading}>
                        Calculate
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}