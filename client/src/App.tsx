import {
	InsuranceCalculationForm,
	ProductList
} from './components';

const App = () => (
	<div className="ic__container">
		<div className="ic__welcome">
			<h1 className="ic__welcome--title">Insurance Premium Calculation</h1>
			<InsuranceCalculationForm />
		</div>
		<ProductList />
	</div>
)

export default App;
