document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form");
  if (!form) return console.error("form#form not found");

  const nipInput = form.querySelector(".nip-input");
  const phoneInput = form.querySelector(".phone-input");
  const nipErrorTag = form.querySelector(".nip-error");
  const phoneErrorTag = form.querySelector(".phone-error");

  function isNIPValid(nip) {
    if (!nip) return false;
    const digits = nip.replace(/\D/g, "");
    if (digits.length !== 10) return false;

    const weights = [6, 5, 7, 2, 3, 4, 5, 6, 7];

    const sum = weights.reduce(
      (acc, weight, index) => acc + weight * parseInt(digits[index]),
      0
    );

    const control = sum % 11;
    return control !== 10 && control === parseInt(digits[9]);
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const nipVal = (nipInput?.value || "").trim();
    let phoneVal = (phoneInput?.value || "").trim();

    const phoneRegex = /^\+?\s*\d[\d\s]{8,15}$/;

    let ok = true;

    if (!isNIPValid(nipVal)) {
      nipErrorTag?.classList.remove("hide");
      nipInput?.focus();
      ok = false;
    } else {
      nipErrorTag?.classList.add("hide");
    }

    if (!phoneRegex.test(phoneVal)) {
      phoneErrorTag?.classList.remove("hide");
      phoneInput?.focus();
      ok = false;
    } else {
      phoneErrorTag?.classList.add("hide");
    }

    if (ok) {
      phoneVal = phoneVal.replace(/\s+/g, "");
      if (!phoneVal.startsWith("+48")) {
        if (phoneVal.startsWith("0")) phoneVal = phoneVal.slice(1);
        phoneVal = "+48" + phoneVal;
      }

      phoneInput.value = phoneVal;
      form.submit();
    }
  });
});
