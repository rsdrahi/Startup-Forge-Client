import React from 'react';
import { AlertDialog, Button } from "@heroui/react";
import { TrashBin } from '@gravity-ui/icons';
import { deleteOpportunities } from '@/lib/api/opportunities/actions';
import toast from 'react-hot-toast';

const DeleteOpportunitiesModal = ({ opportunity, onDelete }) => {

  const handleDelete = async () => {
    const res = await deleteOpportunities(opportunity?._id);
    if (res.deletedCount) {
      toast.success("Opportunity Delete Successfully!");
      await onDelete();
    }
  }

  return (
    <div>
      <AlertDialog>
        <Button isIconOnly size="sm" variant="light" className="bg-red-500/10 text-red-400 hover:bg-red-500/20 rounded-md min-w-[32px] h-[32px]">
          <TrashBin size={16} />
        </Button>
        <AlertDialog.Backdrop>
          <AlertDialog.Container>
            <AlertDialog.Dialog className="sm:max-w-[400px]">
              <AlertDialog.CloseTrigger />
              <AlertDialog.Header>
                <AlertDialog.Heading className='text-center'>Delete Opportunity permanently?</AlertDialog.Heading>
              </AlertDialog.Header>
              <AlertDialog.Body>
              </AlertDialog.Body>
              <AlertDialog.Footer className=' justify-center'>
                <Button slot="close" variant="tertiary">
                  Cancel
                </Button>
                <Button slot="close" variant="danger" onClick={handleDelete}>
                  Delete Opportunity
                </Button>
              </AlertDialog.Footer>
            </AlertDialog.Dialog>
          </AlertDialog.Container>
        </AlertDialog.Backdrop>
      </AlertDialog>
    </div>
  );
};

export default DeleteOpportunitiesModal;