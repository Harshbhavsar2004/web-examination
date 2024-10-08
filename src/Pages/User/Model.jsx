import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { Dialog, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

const Model = ({ setRun }) => {
  const [countdown, setCountdown] = useState(10);
  const [buttonEnabled, setButtonEnabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate(); 
  useEffect(() => {
    if (!isOpen) return;
    setRun(false);
    const timer = setInterval(() => {
      setCountdown((prevCountdown) => {
        if (prevCountdown <= 1) {
          clearInterval(timer);
          setButtonEnabled(true);
          return 0;
        }
        return prevCountdown - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen]);

  const handleHome = async () => {
       navigate("/user-dashboard")
  };

  const handleCloseModal = () => {
    setIsOpen(false);
     // Update the `run` state in the parent component
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <Dialog open={isOpen} className="modal-overlay">
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Cheating Detected</DialogTitle>
          <DialogDescription>
            We're sorry, but your exam has been invalidated due to cheating. This is a serious violation of our academic
            integrity policy. Please exit the exam immediately.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
            <Button onClick={handleHome} disabled={loading}>Exit {loading && '...'}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Model;
