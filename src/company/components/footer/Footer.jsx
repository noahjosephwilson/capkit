"use client";

import React from "react";
import Link from "next/link";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.container}>
      <p className={styles.text}>
        Using the Capkit Platform (Platform) you acknowledge and agree that the data and documents produced by the Platform may not be suitable for your specific situation and that you should seek professional legal advice. You disclaim and indemnify Capkit for any loss sustained as a result of using the Platform. You can view the software{" "}
        <Link href="/terms-of-use" className={styles.link}>
          Terms of Use
        </Link>{" "}
        here.
      </p>
    </footer>
  );
};

export default Footer;
