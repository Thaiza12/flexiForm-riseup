import Input from './Input/Input';
import Email from './Email/Email';
import Nome from './Nome/Nome';
import Textarea from './Textarea/Textarea';
import Select from './Select/Select';
import Checkbox from './Checkbox/Checkbox';
import CheckboxGroup from './CheckboxGroup/CheckboxGroup';
import Password from './Password/Password';
import ImgUpload from './ImgUpload/ImgUpload';
import Cep from './Cep/Cep';
import Cpf from './Cpf/Cpf';
import Phone from './Phone/Phone';
import Url from './Url/Url';
import Idade from './Idade/Idade';
import DataNasci from './DataNasc/DataNasc';
import Genero from './Genero/Genero';
import Termos from './Termos/Termos';
import Escolha from './Escolha/Escolha';
import Address from './Address/Address';
import Moeda from './Moeda/Moeda';
import Habilidades from './Habilidades/Habilidades';
import Rating from './Rating/Rating';





export const componentRegistry = {
  input: Input,
  Email: Email,
  nome: Nome,
  textarea: Textarea,
  select: Select,
  checkbox: Checkbox,
  checkboxGroup: CheckboxGroup,
  phone: Phone,
  Password: Password,
  ImgUpload: ImgUpload,
  Cep: Cep,
  Cpf: Cpf,
  Url: Url,
  Idade: Idade,
  DataNasci:DataNasci,
  Genero: Genero,
  Termos: Termos,
  Escolha: Escolha,
  Address: Address,
  Moeda: Moeda,
  Habilidades: Habilidades,
  Rating: Rating


  
};

export { Input, Email, Nome, Textarea, Select, Checkbox,
   CheckboxGroup, Phone, Password, ImgUpload, Cep, Cpf, Url, Idade, DataNasci, Genero, Termos, 
   Escolha, Address, Moeda, Habilidades,Rating};

export default componentRegistry;

