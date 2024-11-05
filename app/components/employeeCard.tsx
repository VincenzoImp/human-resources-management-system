"use client";

import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input } from '@nextui-org/react';

export default function EmployeeCard(mode: 'create' | 'edit' | 'delete', isOpen: boolean, onClose: () => void) {
	return isOpen ? (
		<Modal size="full" isOpen={isOpen} onClose={onClose}>
			<ModalContent>
				<ModalHeader>
					<	h4>Employee Form</h4>
				</ModalHeader>
				<ModalBody style={{ maxHeight: '70vh', overflowY: 'auto' }}>
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