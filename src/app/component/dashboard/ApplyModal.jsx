"use client";
import { applyForOpportunities } from "@/lib/api/applyOpportunities/actions";
import { Envelope } from "@gravity-ui/icons";
import { Button, Form, Input, Label, Modal, Surface, TextField } from "@heroui/react";
import toast from "react-hot-toast";

const ApplyModal = () => {

  const handleApplySubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    console.log(data, "form data");

    const res = await applyForOpportunities(data);
    console.log(res, "Response")
    if (res.insertedId) {
      toast.success("Application Applied Successfully");
    }
  }

  return (
    <div>
      <Modal>
        <Button className={''} variant='outline'>
          Apply Now
        </Button>
        <Modal.Backdrop>
          <Modal.Container placement="auto">
            <Modal.Dialog className="sm:max-w-md">
              <Modal.CloseTrigger />
              <Modal.Header>
                <Modal.Icon className="bg-accent-soft text-accent-soft-foreground">
                  <Envelope className="size-5" />
                </Modal.Icon>
                <Modal.Heading>Apply Now</Modal.Heading>
              </Modal.Header>
              <Modal.Body className="p-6">
                <Surface variant="default">
                  <Form onSubmit={handleApplySubmit} className="flex flex-col gap-4">

                    <TextField className="w-full" name="opportunityid" type="num" variant="secondary">
                      <Label>Opportunity ID</Label>
                      <Input placeholder="Enter your name" />
                    </TextField>

                    <TextField className="w-full" name="email" type="email" variant="secondary">
                      <Label>Applicant Email</Label>
                      <Input placeholder="Enter your email" />
                    </TextField>

                    <TextField className="w-full" name="url" type="url" variant="secondary">
                      <Label>Portfolio Link</Label>
                      <Input placeholder="Portfolio url" />
                    </TextField>

                    <TextField className="w-full" name="message" type="text" variant="secondary">
                      <Label>Motivation Message</Label>
                      <Input placeholder="Enter your company name" />
                    </TextField>

                    <Modal.Footer>
                      <Button slot="close" variant="secondary">
                        Cancel
                      </Button>
                      <Button slot="close" type="submit">Apply</Button>
                    </Modal.Footer>

                  </Form>
                </Surface>
              </Modal.Body>
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal>
    </div>
  );
};

export default ApplyModal;