"use client";

/**
 * Country-aware phone input — Aurora dark theme.
 * Adapted for TWIST from the Royal Phuket City Hotel implementation.
 */

import { useState, useCallback, useEffect, useRef } from "react";
import {
  getCountryCallingCode,
  parsePhoneNumber,
  type Country,
} from "react-phone-number-input";
import flags from "react-phone-number-input/flags";

const COUNTRIES: { code: Country; name: string }[] = [
  { code: "TH", name: "Thailand" },
  { code: "US", name: "United States" },
  { code: "GB", name: "United Kingdom" },
  { code: "AU", name: "Australia" },
  { code: "CA", name: "Canada" },
  { code: "CN", name: "China" },
  { code: "JP", name: "Japan" },
  { code: "KR", name: "South Korea" },
  { code: "SG", name: "Singapore" },
  { code: "MY", name: "Malaysia" },
  { code: "ID", name: "Indonesia" },
  { code: "VN", name: "Vietnam" },
  { code: "PH", name: "Philippines" },
  { code: "IN", name: "India" },
  { code: "DE", name: "Germany" },
  { code: "FR", name: "France" },
  { code: "IT", name: "Italy" },
  { code: "ES", name: "Spain" },
  { code: "RU", name: "Russia" },
  { code: "BR", name: "Brazil" },
  { code: "MX", name: "Mexico" },
  { code: "AE", name: "United Arab Emirates" },
  { code: "SA", name: "Saudi Arabia" },
  { code: "NZ", name: "New Zealand" },
  { code: "HK", name: "Hong Kong" },
  { code: "TW", name: "Taiwan" },
  { code: "AF", name: "Afghanistan" },
  { code: "AL", name: "Albania" },
  { code: "DZ", name: "Algeria" },
  { code: "AD", name: "Andorra" },
  { code: "AO", name: "Angola" },
  { code: "AG", name: "Antigua and Barbuda" },
  { code: "AR", name: "Argentina" },
  { code: "AM", name: "Armenia" },
  { code: "AT", name: "Austria" },
  { code: "AZ", name: "Azerbaijan" },
  { code: "BS", name: "Bahamas" },
  { code: "BH", name: "Bahrain" },
  { code: "BD", name: "Bangladesh" },
  { code: "BB", name: "Barbados" },
  { code: "BY", name: "Belarus" },
  { code: "BE", name: "Belgium" },
  { code: "BZ", name: "Belize" },
  { code: "BJ", name: "Benin" },
  { code: "BT", name: "Bhutan" },
  { code: "BO", name: "Bolivia" },
  { code: "BA", name: "Bosnia and Herzegovina" },
  { code: "BW", name: "Botswana" },
  { code: "BN", name: "Brunei" },
  { code: "BG", name: "Bulgaria" },
  { code: "KH", name: "Cambodia" },
  { code: "CM", name: "Cameroon" },
  { code: "CL", name: "Chile" },
  { code: "CO", name: "Colombia" },
  { code: "CR", name: "Costa Rica" },
  { code: "HR", name: "Croatia" },
  { code: "CY", name: "Cyprus" },
  { code: "CZ", name: "Czech Republic" },
  { code: "DK", name: "Denmark" },
  { code: "DO", name: "Dominican Republic" },
  { code: "EC", name: "Ecuador" },
  { code: "EG", name: "Egypt" },
  { code: "EE", name: "Estonia" },
  { code: "FJ", name: "Fiji" },
  { code: "FI", name: "Finland" },
  { code: "GE", name: "Georgia" },
  { code: "GH", name: "Ghana" },
  { code: "GR", name: "Greece" },
  { code: "GT", name: "Guatemala" },
  { code: "HN", name: "Honduras" },
  { code: "HU", name: "Hungary" },
  { code: "IS", name: "Iceland" },
  { code: "IE", name: "Ireland" },
  { code: "IL", name: "Israel" },
  { code: "JM", name: "Jamaica" },
  { code: "JO", name: "Jordan" },
  { code: "KZ", name: "Kazakhstan" },
  { code: "KE", name: "Kenya" },
  { code: "KW", name: "Kuwait" },
  { code: "LA", name: "Laos" },
  { code: "LV", name: "Latvia" },
  { code: "LB", name: "Lebanon" },
  { code: "LT", name: "Lithuania" },
  { code: "LU", name: "Luxembourg" },
  { code: "MO", name: "Macau" },
  { code: "MV", name: "Maldives" },
  { code: "MT", name: "Malta" },
  { code: "MU", name: "Mauritius" },
  { code: "MD", name: "Moldova" },
  { code: "MC", name: "Monaco" },
  { code: "MN", name: "Mongolia" },
  { code: "ME", name: "Montenegro" },
  { code: "MA", name: "Morocco" },
  { code: "MM", name: "Myanmar" },
  { code: "NA", name: "Namibia" },
  { code: "NP", name: "Nepal" },
  { code: "NL", name: "Netherlands" },
  { code: "NI", name: "Nicaragua" },
  { code: "NG", name: "Nigeria" },
  { code: "NO", name: "Norway" },
  { code: "OM", name: "Oman" },
  { code: "PK", name: "Pakistan" },
  { code: "PA", name: "Panama" },
  { code: "PY", name: "Paraguay" },
  { code: "PE", name: "Peru" },
  { code: "PL", name: "Poland" },
  { code: "PT", name: "Portugal" },
  { code: "QA", name: "Qatar" },
  { code: "RO", name: "Romania" },
  { code: "RS", name: "Serbia" },
  { code: "SK", name: "Slovakia" },
  { code: "SI", name: "Slovenia" },
  { code: "ZA", name: "South Africa" },
  { code: "LK", name: "Sri Lanka" },
  { code: "SE", name: "Sweden" },
  { code: "CH", name: "Switzerland" },
  { code: "TZ", name: "Tanzania" },
  { code: "TR", name: "Turkey" },
  { code: "UA", name: "Ukraine" },
  { code: "UY", name: "Uruguay" },
  { code: "UZ", name: "Uzbekistan" },
  { code: "VE", name: "Venezuela" },
  { code: "ZM", name: "Zambia" },
  { code: "ZW", name: "Zimbabwe" },
];

interface Props {
  /** Hidden field name — emitted as the final E.164 string in form submissions. */
  name?: string;
  /** Controlled E.164 string (e.g. "+66812345678"). */
  value: string;
  onChange: (value: string) => void;
  defaultCountry?: Country;
  required?: boolean;
  placeholder?: string;
}

export function CountryPhoneSelector({
  name = "phone",
  value,
  onChange,
  defaultCountry = "TH",
  required = false,
  placeholder = "Phone number",
}: Props) {
  const [country, setCountry] = useState<Country>(defaultCountry);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Hydrate from `value` once on mount
  useEffect(() => {
    if (value && !isInitialized) {
      try {
        const parsed = parsePhoneNumber(value);
        if (parsed?.country) {
          setCountry(parsed.country);
          setPhoneNumber(parsed.nationalNumber || "");
        }
      } catch {
        const dialCode = getCountryCallingCode(defaultCountry);
        if (value.startsWith(`+${dialCode}`)) {
          setPhoneNumber(value.slice(dialCode.length + 1));
        }
      }
    }
    setIsInitialized(true);
  }, [value, defaultCountry, isInitialized]);

  // Close on outside click + ESC
  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
        setSearchQuery("");
      }
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setIsOpen(false);
        setSearchQuery("");
      }
    }
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  const buildFullNumber = useCallback(
    (countryCode: Country, phone: string): string => {
      if (!phone) return "";
      const dialCode = getCountryCallingCode(countryCode);
      const cleanPhone = phone.replace(/\D/g, "");
      return `+${dialCode}${cleanPhone}`;
    },
    [],
  );

  const handlePhoneChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newPhone = e.target.value;
      setPhoneNumber(newPhone);
      onChange(buildFullNumber(country, newPhone));
    },
    [country, onChange, buildFullNumber],
  );

  const handleCountryChange = useCallback(
    (newCountry: Country) => {
      setCountry(newCountry);
      const fullNumber = buildFullNumber(newCountry, phoneNumber);
      if (fullNumber) onChange(fullNumber);
      setIsOpen(false);
      setSearchQuery("");
    },
    [phoneNumber, onChange, buildFullNumber],
  );

  const filteredCountries = COUNTRIES.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      getCountryCallingCode(c.code).includes(searchQuery),
  );

  const FlagComponent = flags[country];

  return (
    <div
      className={
        "w-full flex bg-white/[0.04] border border-white/[0.12] rounded-[10px] " +
        "transition-colors focus-within:border-twist-yellow/55 focus-within:bg-white/[0.06]"
      }
    >
      {/* Country code selector */}
      <div className="relative" ref={dropdownRef}>
        <button
          type="button"
          onClick={() => setIsOpen((v) => !v)}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          className={
            "flex items-center gap-2 px-3 py-[14px] min-w-[110px] justify-between " +
            "border-r border-white/[0.12] hover:bg-white/[0.04] transition-colors " +
            "rounded-l-[10px] cursor-pointer text-white/85 hover:text-white"
          }
        >
          <span className="flex items-center gap-2">
            {FlagComponent && (
              <span className="w-5 h-[14px] flex-shrink-0 overflow-hidden rounded-[2px] ring-1 ring-white/10">
                <FlagComponent title={country} />
              </span>
            )}
            <span className="text-sm tw-mono tracking-[0.05em]">
              +{getCountryCallingCode(country)}
            </span>
          </span>
          <svg
            className={`w-3 h-3 text-white/50 transition-transform ${isOpen ? "rotate-180" : ""}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>

        {/* Dropdown */}
        {isOpen && (
          <div
            className={
              "absolute top-full left-0 mt-2 w-[300px] z-50 " +
              "bg-[#0E0422] border border-white/15 rounded-2xl shadow-2xl " +
              "shadow-black/60 overflow-hidden backdrop-blur-xl"
            }
            role="listbox"
          >
            {/* Search */}
            <div className="p-2 border-b border-white/10">
              <input
                ref={inputRef}
                type="text"
                placeholder="Search country..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={
                  "w-full px-3 py-[10px] text-sm bg-white/[0.04] text-white " +
                  "border border-white/10 rounded-lg outline-none " +
                  "focus:border-twist-yellow/60 placeholder:text-white/40"
                }
                autoFocus
              />
            </div>

            {/* Country list */}
            <div className="max-h-[280px] overflow-y-auto">
              {filteredCountries.length === 0 ? (
                <div className="px-4 py-3 text-sm text-white/55">
                  No country found.
                </div>
              ) : (
                filteredCountries.map((c) => {
                  const Flag = flags[c.code];
                  const active = country === c.code;
                  return (
                    <button
                      key={c.code}
                      type="button"
                      role="option"
                      aria-selected={active}
                      onClick={() => handleCountryChange(c.code)}
                      className={`w-full flex items-center gap-3 px-4 py-[10px] text-left transition-colors ${
                        active
                          ? "bg-twist-yellow/10 text-twist-yellow"
                          : "text-white/85 hover:bg-white/[0.05] hover:text-white"
                      }`}
                    >
                      {Flag && (
                        <span className="w-5 h-[14px] flex-shrink-0 overflow-hidden rounded-[2px] ring-1 ring-white/10">
                          <Flag title={c.name} />
                        </span>
                      )}
                      <span className="flex-1 text-sm">{c.name}</span>
                      <span className="text-[11px] tw-mono opacity-60">
                        +{getCountryCallingCode(c.code)}
                      </span>
                      {active && (
                        <svg
                          className="w-4 h-4 text-twist-yellow"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      )}
                    </button>
                  );
                })
              )}
            </div>
          </div>
        )}
      </div>

      {/* Phone number input */}
      <input
        type="tel"
        value={phoneNumber}
        onChange={handlePhoneChange}
        placeholder={placeholder}
        required={required}
        autoComplete="tel-national"
        className={
          "flex-1 px-4 py-[14px] bg-transparent text-white text-sm outline-none " +
          "placeholder:text-white/40"
        }
      />

      {/* Hidden field carrying the full E.164 value into form submissions */}
      <input type="hidden" name={name} value={value} />
    </div>
  );
}
