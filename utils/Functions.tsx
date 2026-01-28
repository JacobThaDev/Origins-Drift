/**
 * Just a collection of utility functions i've either found or made over the years
 */

import { GamingPlatform } from "./types/PlatformsTypes";


/**
 * Censors a word by replacing all characters except the first and last with asterisks.
 * 
 * @param str - The word to be censored.
 * @returns The censored word.
 */
export const censorWord = (str: string) => {
    return str[0] + "*".repeat(str.length - 2) + str.slice(-1);
}

/**
 * Censors an email address by replacing characters between the first 8 characters and the "@" symbol with ellipsis.
 * 
 * @param email - The email address to be censored.
 * @returns The censored email address.
 */
export const censorEmail = (email: string) => {
    var start = email.substring(0, 8);
    let end = email.substring(email.indexOf("@"), email.length)
    return start + "..." + end;
}

/**
 * Combines multiple class names into a single string.
 * 
 * @param classes - The class names to be combined.
 * @returns The combined class names as a string.
 */
export const classNames = (...classes: any) => {
    return classes.filter(Boolean).join(' ')
}

/**
 * Capitalizes the first letter of a string, lowercase the rest
 * 
 * @param str - The string to capitalize.
 * @returns The capitalized string.
 */
export const capitalize = (str?: string) => {
    if (!str) {
        return str;
    }
    let first = str.charAt(0).toUpperCase();
    let end   = str.substring(1, str.length).toLowerCase();
    return first + end;
}

/**
 * Shortens a string to a specified length.
 * If the string length is greater than the specified length, it appends "..." to the shortened string.
 * 
 * @param {string} string The string to be shortened.
 * @param {number} length The maximum length of the shortened string. Default value is 150.
 * @returns the shortened string.
 */
export const shortenString = (string: string, length: number = 150) => {
    if (string.length > length) {
        return string.substring(0, length) + "...";
    }
    return string;
}

/**
 * Shortens the given address string by replacing the middle characters with ellipsis.
 * 
 * @param string - The address string to be shortened.
 * @returns The shortened address string.
 */
export const shortenAddress = (string: string) => {
    let start = string.substring(0, 6);
    let end = string.substring(string.length, string.length - 4);
    return start + "..." + end;
}

/**
 * Formats a number with a specified number of digits.
 * 
 * @param number - The number to be formatted.
 * @param digits - The number of digits to display after the decimal point.
 * @returns The formatted number as a string.
 */
export const formatNumber = (number: any, digits: number = 0) => {
    number = parseFloat(number);

    return number.toLocaleString(undefined, {
        minimumFractionDigits: digits
    });
}

/**
 * Formats an amount of currency with the specified currency symbol.
 * 
 * @param amount - The amount of currency to be formatted.
 * @param currency - The currency symbol to use for formatting.
 * @returns The formatted currency amount as a string.
 */
export const formatCurrency = (amount: any, currency: string) => {
    let dollarString = new Intl.NumberFormat(undefined, {
        style: 'currency',
        currency: currency,
    });
    let finalString = dollarString.format(amount);
    return finalString;
}

export const getGreeting = () => {
    let date = new Date();
    let hour = date.getHours();

    if (hour >= 0 && hour < 6) {
        return "Good night";
    } else if (hour >= 6 && hour < 12) {
        return "Good morning";
    } else if (hour >= 12 && hour < 18) {
        return "Good afternoon"
    } else if (hour >= 18 && hour <= 23) {
        return "Good evening";
    }
}

export const round = (value:number, precision:number) => {
    var multiplier = Math.pow(10, precision || 0);
    return Math.round(value * multiplier) / multiplier;
}

//@ts-ignore
export const fixed = (n:any, fixed:any) => `${n}`.match(new RegExp(`^-?\\d+(?:\.\\d{0,${fixed}})?`))[0];

export const toFixed = (x:any) => {
    if (Math.abs(x) < 1.0) {
        var e = parseInt(x.toString().split('e-')[1]);
        if (e) {
            x *= Math.pow(10,e-1);
            x = '0.' + (new Array(e)).join('0') + x.toString().substring(2);
        }
    } else {
        var e = parseInt(x.toString().split('+')[1]);
        if (e > 20) {
            e -= 18;
            x /= Math.pow(10,e);
            x += (new Array(e+1)).join('0');
        }
    }
    return x;
}

export const copyText = async(text:string) => {
    if (!navigator.clipboard) {
        return copyFallback(text);
    }

    let copied =  await navigator.clipboard.writeText(text).then(function() {
        return true;
    }, function(err) {
        console.log(err);
        return false;
    });

    return copied
}

export const copyFallback = (text:string) => {
    var textArea   = document.createElement("textarea");
    textArea.value = text;

    textArea.style.top  = "0";
    textArea.style.left = "0";
    textArea.style.position = "fixed";

    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
        var copied = document.execCommand('copy');
        document.body.removeChild(textArea);
        return copied;
    } catch (err) {
        console.log(err);
        document.body.removeChild(textArea);
        return false;
    }
}

export const isValidUsername = (text:string|undefined|null) => {
    if (!text) {
        return false;
    }
    
    if (text.length < 3 || text.length > 20) {
        return false;
    }
    
    if (text.trim() != text) {
        return false;
    }

    return /^([A-Za-z0-9\s_]+)$/.test(text);
}

export const isValidIpAddress = (ip:string) => {
  // Regular expression for IPv4 validation
  const ipv4Regex = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
  // Regular expression for IPv6 validation (simplified, more comprehensive regex exist)
  const ipv6Regex = /^([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$/;
  return ipv4Regex.test(ip) || ipv6Regex.test(ip);
}

/**
 * checks if a string is a valid url
 * @param url_string 
 * @returns {boolean} true if url is valid
 */
export const isValidUrl = (url_string:string) => {
    try {
        const url = new URL(url_string);
        return url.protocol === "https:";
    } catch (e) {
        return false;
    }
}

/**
 * Converts a Date object or timestamp into a relative string (e.g., "5 minutes ago")
 * @param {Date | number | string} inputDate 
 * @param {string} locale - Default 'en'
 */
export function getRelativeTime(inputDate:any, locale = 'en') {
    const date = new Date(inputDate);
    const now  = new Date();
    
    // Calculate difference in seconds
    const seconds = Math.round((date.getTime() - now.getTime()) / 1000);

    // Define time units in seconds
    const units = [
        { label: 'year',   seconds: 31536000 },
        { label: 'month',  seconds: 2592000 },
        { label: 'week',   seconds: 604800 },
        { label: 'day',    seconds: 86400 },
        { label: 'hour',   seconds: 3600 },
        { label: 'minute', seconds: 60 },
        { label: 'second', seconds: 1 }
    ] as const;

    // Initialize the Intl formatter
    const rtf = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' });

    // Find the first unit where the difference is greater than the unit's value
    for (const unit of units) {
        if (Math.abs(seconds) >= unit.seconds || unit.label === 'second') {
            const value = Math.round(seconds / unit.seconds);
            return rtf.format(value, unit.label);
        }
    }
}

export const getAvatar = (member_id:string, avatarHash:string) => {
    const extension = avatarHash 
                && avatarHash.startsWith("a_") ? "gif" : "png";
            
    const avatarUrl = avatarHash && avatarHash 
        ? `https://cdn.discordapp.com/avatars/${member_id}/${avatarHash}.${extension}`
        : `https://cdn.discordapp.com/embed/avatars/${(BigInt(member_id) >> 22n) % 6n}.png`;

    return avatarUrl;
}

export const getPlatformName = (platform:string) => {
    if (platform == "XBOX" || platform == "WINDOWS") {
        return `Xbox`;
    }
    return capitalize(platform);
}


export const getPlatformLink = (platform:GamingPlatform|null|undefined, platformName:string|null|undefined) => {
    if (platform == "XBOX" || platform == "WINDOWS") {
        return `https://www.xbox.com/en-us/play/user/`+(platformName);
    } else if (platform == "STEAM") {
        return `https://steamcommunity.com/id/`+(platformName);
    } else if (platform == "PLAYSTATION") {
        return `https://psnprofiles.com/`+(platformName);
    }
    return null;
}