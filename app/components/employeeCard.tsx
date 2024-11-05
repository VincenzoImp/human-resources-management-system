"use client";

import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input } from '@nextui-org/react';
import { useEmployeeCard } from '../context';

export default function EmployeeCard() {
	const { isOpen, onClose, mode } = useEmployeeCard();
	return isOpen ? (
		<Modal isOpen={isOpen} onClose={onClose}>
			<ModalContent>
				<ModalHeader>
					<h4>Employee Form {mode}</h4>
				</ModalHeader>
				<ModalBody>
					<Input label="Name" placeholder="Name" />
					<Input label="Surname" placeholder="Surname" />
					<Input label="Email" placeholder="Email" />
					<Input label="Phone" placeholder="Phone" />
				</ModalBody>
				<ModalFooter>
					<Button color="danger" variant="light" onPress={onClose}>
						Close
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	) : <></>
};