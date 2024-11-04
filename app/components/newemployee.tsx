import React, { useState } from 'react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Checkbox,
  Divider,
  Spacer,
} from '@nextui-org/react';

import type { Employee } from '../context';

interface EmployeeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const EmployeeModal: React.FC<EmployeeModalProps> = ({ isOpen, onClose }) => {
  const [employee, setEmployee] = useState<Employee>({
    name: '',
    surname: '',
    email: '',
    phone: '',
    document: '',
    tax_code: '',
    employed: false,
    birthplace: '',
    birthplace_nation: '',
    birthplace_provincia: '',
    birthdate: new Date(),
    livingplace_address: '',
    livingplace_nation: '',
    livingplace_provincia: '',
    livingplace_zipcode: 0,
    n_mat: 0,
    n_pro: 0,
    gender: '', // Added gender property
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    setEmployee((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(employee);
    // You can handle further submission logic here (like sending to an API)
    onClose(); // Close the modal after submission
  };

  return (
    <Modal size="full" isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalHeader>
          <h4>Employee Form</h4>
        </ModalHeader>
        <ModalBody style={{ maxHeight: '70vh', overflowY: 'auto' }}>
          <form onSubmit={handleSubmit}>
            {/* Personal Information Section */}
            <h5>Personal Information</h5>
            <Divider />
            <Spacer y={1} />
            <Input
              isClearable
              fullWidth
              placeholder="Name"
              name="name"
              value={employee.name}
              onChange={handleChange}
            />
            <Spacer y={1} />
            <Input
              isClearable
              fullWidth
              placeholder="Surname"
              name="surname"
              value={employee.surname}
              onChange={handleChange}
            />
            <Spacer y={1} />
            <Input
              isClearable
              fullWidth
              placeholder="Email"
              name="email"
              value={employee.email}
              onChange={handleChange}
              type="email"
            />
            <Spacer y={1} />
            <Input
              isClearable
              fullWidth
              placeholder="Phone"
              name="phone"
              value={employee.phone}
              onChange={handleChange}
            />
            <Spacer y={1} />
            <Input
              isClearable
              fullWidth
              placeholder="Document"
              name="document"
              value={employee.document}
              onChange={handleChange}
            />
            <Spacer y={1} />
            <Input
              isClearable
              fullWidth
              placeholder="Tax Code"
              name="tax_code"
              value={employee.tax_code}
              onChange={handleChange}
            />
            <Spacer y={1} />
            <Checkbox
              name="employed"
              isSelected={employee.employed}
              onChange={handleChange}
            >
              Currently Employed
            </Checkbox>

            {/* Birthplace Information Section */}
            <Spacer y={2} />
            <h5>Birthplace Information</h5>
            <Divider />
            <Spacer y={1} />
            <Input
              isClearable
              fullWidth
              placeholder="Birthplace"
              name="birthplace"
              value={employee.birthplace}
              onChange={handleChange}
            />
            <Spacer y={1} />
            <Input
              isClearable
              fullWidth
              placeholder="Birthplace Nation"
              name="birthplace_nation"
              value={employee.birthplace_nation}
              onChange={handleChange}
            />
            <Spacer y={1} />
            <Input
              isClearable
              fullWidth
              placeholder="Birthplace Provincia"
              name="birthplace_provincia"
              value={employee.birthplace_provincia}
              onChange={handleChange}
            />
            <Spacer y={1} />
            <Input
              isClearable
              fullWidth
              placeholder="Birthdate"
              name="birthdate"
              type="date"
              value={employee.birthdate.toISOString().split('T')[0]}
              onChange={handleChange}
            />

            {/* Living Place Information Section */}
            <Spacer y={2} />
            <h5>Living Place Information</h5>
            <Divider />
            <Spacer y={1} />
            <Input
              isClearable
              fullWidth
              placeholder="Living Place Address"
              name="livingplace_address"
              value={employee.livingplace_address}
              onChange={handleChange}
            />
            <Spacer y={1} />
            <Input
              isClearable
              fullWidth
              placeholder="Living Place Nation"
              name="livingplace_nation"
              value={employee.livingplace_nation}
              onChange={handleChange}
            />
            <Spacer y={1} />
            <Input
              isClearable
              fullWidth
              placeholder="Living Place Provincia"
              name="livingplace_provincia"
              value={employee.livingplace_provincia}
              onChange={handleChange}
            />
            <Spacer y={1} />
            <Input
              isClearable
              fullWidth
              placeholder="Living Place Zipcode"
              name="livingplace_zipcode"
              type="text"
              value={String(employee.livingplace_zipcode)}
              onChange={handleChange}
            />
            <Spacer y={1} />
            <Input
              isClearable
              fullWidth
              placeholder="N Mat"
              name="n_mat"
              type="text"
              value={String(employee.n_mat)}
              onChange={handleChange}
            />
            <Spacer y={1} />
            <Input
              isClearable
              fullWidth
              placeholder="N Pro"
              name="n_pro"
              type="text"
              value={String(employee.n_pro)}
              onChange={handleChange}
            />

            <Spacer y={2} />
            <Button type="submit" color="primary" fullWidth>
              Submit
            </Button>
          </form>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" variant="light" onPress={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EmployeeModal;
