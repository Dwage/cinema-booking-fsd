import React, { useState, useMemo, useCallback, useEffect } from "react";
import { Modal } from "@/shared/ui/Modal/Modal";
import { SeatMap } from "../SeatMap/SeatMap";
import { Button, ButtonVariant } from "@/shared/ui/Button/Button";
import type { HallInfo } from "@/entities/session";
import {
  submitOrder,
  OrderPayload,
  OrderSeatInfo,
  OrderContactInfo,
} from "@/entities/order";
import styles from "./BookingWidget.module.scss";

interface SelectedSeatInfo extends OrderSeatInfo {}
interface ContactFormState extends OrderContactInfo {}

interface BookingWidgetProps {
  isOpen: boolean;
  onClose: () => void;
  hallInfo: HallInfo;
  sessionId: string;
  sessionTitle?: string;
  sessionTime?: string;
}

export const BookingWidget: React.FC<BookingWidgetProps> = ({
  isOpen,
  onClose,
  hallInfo,
  sessionId,
  sessionTitle,
  sessionTime,
}) => {
  const [selectedSeats, setSelectedSeats] = useState<SelectedSeatInfo[]>([]);
  const [contactInfo, setContactInfo] = useState<ContactFormState>({
    name: "",
    email: "",
    phone: "",
  });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState<boolean>(false);

  const handleToggleSeat = useCallback((seatNumber: number, price: number) => {
    setSelectedSeats((prevSelected) => {
      const existingIndex = prevSelected.findIndex(
        (s) => s.seatNumber === seatNumber
      );
      if (existingIndex > -1) {
        return prevSelected.filter((_, index) => index !== existingIndex);
      } else {
        return [...prevSelected, { seatNumber, price }];
      }
    });
    setSubmitSuccess(false);
    setSubmitError(null);
  }, []);

  const totalAmount = useMemo(() => {
    return selectedSeats.reduce((sum, seat) => sum + seat.price, 0);
  }, [selectedSeats]);

  const handleFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setContactInfo((prev) => ({ ...prev, [name]: value }));
    setSubmitSuccess(false);
    setSubmitError(null);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(false);

    try {
      const orderData: OrderPayload = {
        sessionId: sessionId,
        selectedSeats: selectedSeats,
        totalAmount: totalAmount,
        contactInfo: contactInfo,
        orderTimestamp: new Date().toISOString(),
      };

      const createdOrder = await submitOrder(orderData);
      console.log("Order submitted successfully:", createdOrder);

      setSelectedSeats([]);
      setTimeout(() => {
        setSubmitSuccess(true);
      }, 2000);
    } catch (error) {
      console.error("Order submission failed:", error);
      setSubmitError(
        error instanceof Error
          ? error.message
          : "Failed to submit order. Please try again."
      );
    } finally {
      setTimeout(() => {
        setIsSubmitting(false);
      }, 2000);
    }
  };

  useEffect(() => {
    if (!isOpen) {
      setSelectedSeats([]);
      setContactInfo({ name: "", email: "", phone: "" });
      setIsSubmitting(false);
      setSubmitError(null);
      setSubmitSuccess(false);
    }
  }, [isOpen]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Booking tickets for: ${sessionTitle || "Session"}`}
      containerClassName={styles.bookingModalContainer}
      className={styles.bookingModalContent}
    >
      {submitSuccess ? (
        <div className={styles.successMessage}>
          <h3>Booking Successful!</h3>
          <p>
            Your order has been placed. Details sent to
            {contactInfo.email || "your email"}.
          </p>
          <Button onClick={onClose}>Close</Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          {sessionTime && (
            <p className={styles.sessionInfo}>Time: {sessionTime}</p>
          )}
          <div className={styles.widgetSection}>
            <h4>1. Select Seats</h4>
            <SeatMap
              rows={hallInfo.layout.rows}
              seatsPerRow={hallInfo.layout.seatsPerRow}
              bookedSeats={hallInfo.bookedSeats}
              selectedSeats={selectedSeats.map((s) => s.seatNumber)}
              basePrice={hallInfo.baseTicketPrice}
              onToggleSeat={handleToggleSeat}
            />
          </div>

          {selectedSeats.length > 0 && (
            <div className={styles.widgetSection}>
              <h4>Selected Seats</h4>
              <ul className={styles.selectedList}>
                {selectedSeats.map((seat) => (
                  <li key={seat.seatNumber}>
                    Seat {seat.seatNumber} - {seat.price} RUB
                    <button
                      type="button"
                      className={styles.removeSeatBtn}
                      onClick={() =>
                        handleToggleSeat(seat.seatNumber, seat.price)
                      }
                      title="Remove seat"
                      disabled={isSubmitting}
                    >
                      ×
                    </button>
                  </li>
                ))}
              </ul>
              <p className={styles.totalAmount}>
                Total Amount: <strong>{totalAmount} RUB</strong>
              </p>
            </div>
          )}

          <div className={styles.widgetSection}>
            <h4>2. Contact Information</h4>
            <div className={styles.formGroup}>
              <label htmlFor="booking-name">Name</label>
              <input
                type="text"
                id="booking-name"
                name="name"
                required
                value={contactInfo.name}
                onChange={handleFormChange}
                disabled={isSubmitting}
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="booking-email">Email</label>
              <input
                type="email"
                id="booking-email"
                name="email"
                required
                value={contactInfo.email}
                onChange={handleFormChange}
                disabled={isSubmitting}
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="booking-phone">Phone</label>
              <input
                type="tel"
                id="booking-phone"
                name="phone"
                required
                value={contactInfo.phone}
                onChange={handleFormChange}
                disabled={isSubmitting}
              />
            </div>
          </div>

          {submitError && <div> Error</div>}

          <div className={styles.formActions}>
            <Button
              type="button"
              variant={ButtonVariant.GHOST}
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant={ButtonVariant.PRIMARY}
              disabled={
                selectedSeats.length === 0 ||
                !contactInfo.name ||
                !contactInfo.email ||
                !contactInfo.phone ||
                isSubmitting
              }
            >
              {isSubmitting ? "Processing..." : "Confirm Booking"}
            </Button>
          </div>
        </form>
      )}
    </Modal>
  );
};
